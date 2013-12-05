
Template.header.events({
  'click .link-about': function (e) {
    Meteor.Router.to('about');
    e.preventDefault();
  },
  'click .link-home, click .link-logo': function (e) {
    Meteor.Router.to('home');
    e.preventDefault();
  }
});

Template.questions.questions = function () {
  return Questions.find({ answered: false }, { sort: { timestamp: -1 } });
};

Template.answeredQuesions.questions = function () {
  return Questions.find({ answered: true }, { sort: { timestamp: -1 } });
};

Template.header.rendered = function () {
  Deps.autorun(function () {
    if (!Meteor.user())
      setTimeout(putGitHubIcon, 0);
  });
};

Template.header.title = function () {
  if (Meteor.Router.page() === "feed")
    return "DevshopQuestions.Meteor.com";
  return "Devshop Questions";
};

function putGitHubIcon () {
  $("#login-buttons-image-github").remove();
  $("#login-buttons-github").prepend($('<i/>', { class: "fa fa-github" }));
}


