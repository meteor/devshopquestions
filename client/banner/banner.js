Template.banner.events({
  'click .alert': function () {
    if (!Meteor.user() || !Meteor.user().admin)
      return;
    // We switch back only on press of 'done editing' or 'cancel editing'
    if (!Session.get('banner-editing'))
      Session.set('banner-editing', true);
  },
  'click .banner-save-edits': function (e) {
    Announcements.update(latestAnnouncement()._id,
                         { $set:{ 'html': $('#banner-text').val() } });
    Session.set('banner-editing', false);

    e.preventDefault();
    e.stopPropagation();
    return false;
  },
  'click .banner-cancel-edits': function (e) {
    Session.set('banner-editing', false);
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

function latestAnnouncement() {
  return Announcements.findOne() && Announcements.find({}, {sort:{when:-1}}).fetch()[0]
    || { html: "", _id: "" };
}

Template.banner.announcement = function () {
  return latestAnnouncement().html;
};

Template.banner.editing = function () {
  return Session.get('banner-editing');
};

Template.banner.rendered = function () {
  Deps.autorun(function () {
    if (!Session.get('banner-editing'))
      return;
    setTimeout(function () {
      $('#banner-text').val(latestAnnouncement().html);
    });
  });
};

