Template.questions.questions = function () {
  return Questions.find({ answered: false });
};

Template.answeredQuesions.questions = function () {
  return Questions.find({ answered: true });
};

