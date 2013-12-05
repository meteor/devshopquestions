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

function isAdmin(userId) {
  return Meteor.users.findOne(userId) &&
    Meteor.users.findOne(userId).admin;
}

