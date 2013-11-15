Questions.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return Meteor.call('hasPermissions', userId, doc);
  },
  'remove': function (userId, doc) {
    return Meteor.call('hasPermissions', userId, doc);
  }
});

