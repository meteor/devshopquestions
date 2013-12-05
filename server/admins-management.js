Meteor.startup(function () {
  // update admins every 10 sec
  Meteor.defer(function cycle () {
    updateAdmins();
    Meteor.setTimeout(cycle, 10 * 1000);
  });
});

function updateAdmins () {
  Meteor.users.find().forEach(function (user) {
    // XXX no regex escape... why?
    var ghRegex = new RegExp('^' + user.services.github.username + '$', 'i');
    var isAdmin = !!Admins.findOne({ github: ghRegex });
    var wasAdmin = !!user.admin;

    if (isAdmin !== wasAdmin)
      Meteor.users.update(user._id, { $set: { admin: isAdmin } });
  });
}

