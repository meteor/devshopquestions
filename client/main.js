Template.questions.questions = function () {
  return Questions.find({ answered: false });
};

Template.answeredQuesions.questions = function () {
  return Questions.find({ answered: true });
};

Template.form.events({
  'click button': function (e, templ) {
    var name = $(templ.find("#name")).val();
    var location = $(templ.find("#location")).val();
    var question = $(templ.find("#text")).val();

    if (!name || !location || !question)
      return true;

    resetForm();

    e.preventDefault();
    return false;
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
    resetForm();
  });
};

function resetForm () {
  $("form #name").val(Meteor.user() ? Meteor.user().profile.name : "");
  $("form #location").val("");
  $("form #text").val("");
}

