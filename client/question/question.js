Session.setDefault("editing-id", null);

Template.question.rendered = function () {
  var self = this;
  self.questionTextHandle = Deps.autorun(function () {
    var text = Questions.findOne(self.data._id).text;
    var editing = IdIsEditing(self.data._id);
    setTimeout(function () {
      if (editing) {
        $(self.find("textarea")).text(text)
        .focus()
        .focusout(function () {
          var text = $(self.find("textarea")).val();
          Questions.update(self.data._id, { $set: { text: text } });
          Session.set("editing-id", null);
        });
      } else {
        var domNode = $(self.find(".question .text"));
        if (domNode.hasClass("hasMore"))
          domNode.more("destroy");
        domNode.text(text)
        .more({ length: 300 });
      }
    }, 0);
  });
};

Template.question.destroyed = function () {
  if (this.questionTextHandle)
    this.questionTextHandle.stop();
};

Template.question.answered = function () {
  if (this.answered)
    return "answered-question";
  return "";
};

Template.question.img = function () {
  return "//www.gravatar.com/avatar/" + this.poster.emailMd5;
};

Template.question.prettyDate = function () {
  return relativeDate(this.timestamp);
};

Template.question.editing = function () {
  return Session.equals("editing-id", this._id);
}

Template.question.events({
  'click .active-ribbon, click .empty-ribbon': function (e) {
    var self = this;
    Meteor.call('hasPermissions', Meteor.userId(), Questions.findOne(self._id), function (err, res) {
      if (err || !res)
        return;
      Questions.update(self._id, { $set: { flagged: !self.flagged }});
    });
  },

  'click [data-action=toggle-answered]': function () {
    var self = this;
    Meteor.call('hasPermissions', Meteor.userId(), Questions.findOne(self._id), function (err, res) {
      if (err || !res)
        return;
      Questions.update(self._id, { $set: { answered: !self.answered }});

    });
  },
  'click [data-action=delete]': function () {
    var self = this;
    Meteor.call('hasPermissions', Meteor.userId(), Questions.findOne(self._id), function (err, res) {
      if (err || !res)
        return;
      Questions.remove(self._id);
    });
  },

  'dblclick .text': function () {
    var self = this;
    Meteor.call('hasPermissions', Meteor.userId(), Questions.findOne(self._id), function (err, res) {
      if (err || !res)
        return;
      Session.set('editing-id', self._id);
    });
  }
});

var timeDependency = new Deps.Dependency;
var relativeDate = function (then) {
  timeDependency.depend();
  var now = new Date;
  var secondsAgo = Math.floor((now.getTime() - then.getTime()) / 1000);
  var minutesAgo = Math.floor(secondsAgo / 60);
  var hoursAgo = Math.floor(minutesAgo / 60);
  var daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 1)
    return "just now";
  else if (hoursAgo < 1) {
    return minutesAgo + " minute" + (minutesAgo !== 1 ? "s" : "") + " ago";
  } else if (daysAgo < 1) {
    return hoursAgo + " hour" + (hoursAgo !== 1 ? "s" : "") + " ago";
  } else if (daysAgo < 40) {
    return daysAgo + " day" + (daysAgo !== 1 ? "s" : "") + " ago";
  } else
    return "Long long time ago";
};

Meteor.setInterval(function () {
  timeDependency.changed();
}, 1000);

function IdIsEditing (id) {
  return Session.equals("editing-id", id);
}

