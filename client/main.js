Template.body.add_question = function () {
  return Session.get('add_question');
};

Template.body.events({
  'click #ask-question-form': function (e) {
    Session.set('add_question', true);
    e.preventDefault();
  }
});

Template.questions.questions = function () {
  return Questions.find({ answered: false });
};

Template.answeredQuesions.questions = function () {
  return Questions.find({ answered: true });
};

Template.form.events({
  'click #ask-button': function (e, templ) {
    var name = $(templ.find("#name")).val();
    var location = $(templ.find("#location")).val();
    var question = $(templ.find("#text")).val();

    if (!name || !location || !question)
      return true;

    resetForm();

    var emailMd5 = Meteor.user() ? md5(Meteor.user().services.github.email) : "";
    Questions.insert({
      text: question,
      location: location,
      timestamp: (new Date),
      flagged: false,
      answered: false,
      poster: {
        name: name,
        emailMd5: emailMd5
      }
    });
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
  $("form #location").val("");
  $("form #text").val("");
}


