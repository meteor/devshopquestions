Meteor.startup(function () {
  Questions.allow({
    'insert': function (userId, doc) {
      check(doc, Question);

      if (doc.flagged && !isAdmin(userId))
        return false;

      return true;
    },
    'update': function (userId, doc, fieldNames, modifier) {
      check(doc, Question);
      if (_.contains(fieldNames, 'flagged') && !isAdmin(userId))
        return false;
      return Meteor.call('hasPermissions', userId, doc);
    },
    'remove': function (userId, doc) {
      check(doc, Question);
      return Meteor.call('hasPermissions', userId, doc);
    }
  });

  // For now it is admin-only
  Announcements.allow({
    'insert': function (userId, doc) {
      check(doc, Announcement);
      return isAdmin(userId);
    },
    'update': function (userId, doc, fieldNames, modifier) {
      check(doc, Announcement);
      return isAdmin(userId);
    },
    'remove': function (userId, doc) {
      check(doc, Announcement);
      return isAdmin(userId);
    }
  });

  Admins.allow({
    'insert': isAdmin,
    'update': isAdmin,
    'remove': isAdmin
  });
});

function isAdmin(userId) {
  return Meteor.users.findOne(userId) &&
    Meteor.users.findOne(userId).admin;
}

