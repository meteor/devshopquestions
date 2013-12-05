Template.askForm.add_question = function () {
  return Session.get('add_question');
};

Template.askForm.events({
  'click #ask-question-form': function (e) {
    Session.set('add_question', true);
    e.preventDefault();
  }
});

Template.form.events({
  'click #ask-button': function (e, templ) {
    var name = $(templ.find("#name")).val();
    var location = $(templ.find("#location")).val();
    var question = $(templ.find("#text")).val();

    if (!name || !location || !question)
      return true;

    resetForm();

    var emailMd5 = Meteor.user() ? md5(Meteor.user().services.github.email) : "";
    var doc = {
      text: question,
      location: location,
      timestamp: (new Date),
      flagged: false,
      answered: false,
      poster: {
        name: name,
        emailMd5: emailMd5,
        userId: (Meteor.userId() || "")
      }
    };
    Questions.insert(doc);
    // close form
    Session.set("add_question", false);
    e.preventDefault();
    return false;
  },

  'click #cancel-button': function (e) {
    Session.set("add_question", false);
    e.preventDefault();
  },

  'click #github-login': function (e) {
    $('#login-buttons-github').click();
    e.preventDefault();
  }
});

Template.form.logged_in = function () {
  return !!Meteor.user();
};

Template.form.rendered = function () {
  Deps.autorun(function () {
    // retain Meteor.user() which will register the dependency
    Meteor.user();
    setTimeout(resetForm, 0);
  });
};

function resetForm () {
  $("form #name").val(Meteor.user() ? Meteor.user().profile.name : "");
  // We don't clear out the previous location for usability
  // UX FTW!
  // $("form #location").val("");
  $("form #text").val("");
}

