Question = {
  text: String,
  location: String,
  timestamp: Date,
  flagged: Boolean,
  answered: Boolean,
  poster: {
    name: String,
    emailMd5: String,
    userId: String
  },
  _id: String
};

Questions = new Meteor.Collection("questions");
 
// XXX Announcement just contains plain html we would inject later with tripple
// stash in our templates. It is very hacky but right now only admin is capable
// of setting this. Emily would be mad, be sure to fix it before she sees it.
Announcement = {
  html: String,
  when: Date,
  _id: String
};

Announcements = new Meteor.Collection("announcements");

Admin = {
  // XXX replace with Meteor account in near future!
  github: String,
  _id: String
};

Admins = new Meteor.Collection("admins");

if (Meteor.isServer) {
  Meteor.publish("admins", function () {
    if (this.userId && Meteor.users.findOne(this.userId).admin)
      return Admins.find();
  });
  Meteor.publish("announcements", function () {
    return Announcements.find({});
  });
  Meteor.publish("questions", function () {
    return Questions.find({});
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
  });
} else {
  Meteor.subscribe("admins");
  Meteor.subscribe("announcements");
  Meteor.subscribe("questions");
  Meteor.subscribe("userData");
}

Meteor.methods({
  'hasPermissions': function (userId, doc) {
    try {
      var creatorId = doc.poster.userId;
      if (creatorId === "" || !creatorId || creatorId === userId) {
        return true;
      }
      return Meteor.users.findOne(userId).admin ||
        (/^.*@meteor.com$/.test(Meteor.users.findOne(userId).services.github.email));
    } catch (e) {
      return false;
    }
  }
});

