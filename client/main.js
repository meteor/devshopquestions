Session.setDefault('active', 'home');

UI.body.active = function () {
  return Template[Session.get('active')];
};

Template.header.events({
  'click .link-about': function (e) {
    Session.set('active', 'about');
    e.preventDefault();
  },
  'click .link-home, click .link-logo': function (e) {
    Session.set('active', 'home');
    e.preventDefault();
  }
});

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
  return Questions.find({ answered: false }, { sort: { timestamp: -1 } });
};

Template.answeredQuesions.questions = function () {
  return Questions.find({ answered: true }, { sort: { timestamp: -1 } });
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

Template.header.rendered = function () {
  Deps.autorun(function () {
    if (!Meteor.user())
      setTimeout(putGitHubIcon, 0);
  });
};

function resetForm () {
  $("form #name").val(Meteor.user() ? Meteor.user().profile.name : "");
  $("form #location").val("");
  $("form #text").val("");
}

function putGitHubIcon () {
  $("#login-buttons-image-github").remove();
  $("#login-buttons-github").prepend($('<i/>', { class: "fa fa-github" }));
}


