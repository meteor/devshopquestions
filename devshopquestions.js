if (Meteor.isClient) {
  Session.setDefault("active-section", "questions");

  Template.header.sections = function () {
    return [{
      _id: "questions",
      label: "Questions",
      icon: "question-sign"
    }, {
      _id: "announcements",
      label: "Announcements",
      icon: "bullhorn"
    }, {
      _id: "guide",
      label: "Starter's guide",
      icon: "book"
    }];
  };

  Template.header.active = function () {
    return Session.equals("active-section", this._id) ? "active" : "";
  };

  Template.header.events({
    "click .nav a": function (e) {
      Session.set("active-section", this._id);
      e.preventDefault();
    }
  });

  UI.body.active = function () {
    var templateName = Session.get("active-section");
    return Template[templateName];
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
