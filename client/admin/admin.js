Template.adminPanel.admins = function () {
  return Admins.find();
};

Template.adminPanel.events({
  'click .remove': function () {
    Admins.remove(this._id);
  },
  'click .add': function () {
    var name = $('.admin-name').val();
    $('.admin-name').val('');
    Admins.insert({ github: name });
  }
});

