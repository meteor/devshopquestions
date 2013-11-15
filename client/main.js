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

    $(templ.find("#name")).val("");
    $(templ.find("#location")).val("");
    $(templ.find("#text")).val("");

    e.preventDefault();
    return false;
  }
});

Meteor.startup(function () {
  Session.setDefault("form-shown", false);
});

