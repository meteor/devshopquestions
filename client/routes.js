Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/displays': 'feed',
  '/admin': function () {
    if (Meteor.user() && Meteor.user().admin)
      return "adminPanel";
    return 'home';
  },
  '*': 'home'
});

