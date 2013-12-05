Template.banner.events({
  'click .alert': function () {
    // XXX make banner editable
    console.log('you clicked on the banner');
  }
});

Template.banner.announcement = function () {
  return Announcements.findOne() && Announcements.find({}, {sort:{when:-1}}).fetch()[0].html;
};

