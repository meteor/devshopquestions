Questions.allow({
  'insert': function (userId, doc) {
    check(doc, Question);

    if (doc.flagged && !Meteor.users.findOne(userId).admin)
      return false;

    return true;
  },
  'update': function (userId, doc, fieldNames, modifier) {
    check(doc, Question);
    if (_.contains(fieldNames, 'flagged') && !Meteor.users.findOne(userId).admin)
      return false;
    return Meteor.call('hasPermissions', userId, doc);
  },
  'remove': function (userId, doc) {
    check(doc, Question);
    return Meteor.call('hasPermissions', userId, doc);
  }
});

