Question = {
  text: String,
  location: String,
  timestamp: Date,
  flagged: Boolean,
  answered: Boolean,
  poster: {
    name: String,
    emailMd5: String,
    userId: String
  },
  _id: String
};

Questions = new Meteor.Collection("questions");
 
// XXX Announcement just contains plain html we would inject later with tripple
// stash in our templates. It is very hacky but right now only admin is capable
// of setting this. Emily would be mad, be sure to fix it before she sees it.
Announcement = {
  html: String,
  when: Date,
  _id: String
};

Announcements = new Meteor.Collection("announcements");

Admin = {
  // XXX replace with Meteor account in near future!
  github: String,
  _id: String
};

Admins = new Meteor.Collection("admins");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Gods are initialized here
    if (!Admins.find().count())
      _.each(["avital", "awoo1126", "debergalis", "dgreensp", "ekatek", "estark37", "glasser", "gschmidt", "jadeqwang", "karayu", "n1mmy", "sixolet", "Slava", "yaliceme"], function (gh) {
        Admins.insert({ github: gh });
      });

    if (!Announcements.find().count())
      Announcements.insert({
        html: '<strong>We are on Twitter!</strong> Tweet your announcements on <a href="https://twitter.com/search?q=%23meteordevshop" class="alert-link">#MeteorDevshop</a>',
        when: (new Date)
      });
    if (!Questions.find().count())
      _.each([{
        text: "lorem posum realtime ipsum minimongo short one",
        location: "front door",
        timestamp: (new Date),
        flagged: true,
        answered: false,
        poster: {
          name: "Realtime monkey",
          emailMd5: "5cc411461e4b68aa2d0400a7eeccf949",
          userId: ""
        }
      }, {
        text: "Echo Park excepteur Wes Anderson Pinterest, fugiat trust fund Cosby sweater McSweeney's 3 wolf moon XOXO organic bitters Portland Brooklyn. Put a bird on it Tonx cred, cardigan mustache keytar scenester. Irure laborum occupy Etsy craft beer. Swag Marfa distillery, nulla leggings disrupt gastropub small batch Thundercats dolore hoodie Brooklyn. Cosby sweater Shoreditch try-hard irony gluten-free. Church-key hella kogi, Truffaut enim next level chia pork belly photo booth fap Tonx. Blue Bottle mlkshk nesciunt mixtape sriracha typewriter, locavore retro meggings dolor Cosby sweater fanny pack.",
        location: "roof",
        timestamp: new Date(new Date - 1000*10*60),
        flagged: false,
        answered: false,
        poster: {
          name: "Hipster Hacker",
          emailMd5: "5cc411461e4b68aa2d0400a7eeccf949",
          userId: ""
        }
      }], function (x) {
        Questions.insert(x);
      });
  });

  Meteor.publish("admins", function () {
    if (this.userId && Meteor.users.findOne(this.userId).admin)
      return Admins.find();
  });
  Meteor.publish("announcements", function () {
    return Announcements.find({});
  });
  Meteor.publish("questions", function () {
    return Questions.find({});
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
  });
} else {
  Meteor.subscribe("admins");
  Meteor.subscribe("announcements");
  Meteor.subscribe("questions");
  Meteor.subscribe("userData");
}

Meteor.methods({
  'hasPermissions': function (userId, doc) {
    try {
      var creatorId = doc.poster.userId;
      if (creatorId === "" || !creatorId || creatorId === userId) {
        return true;
      }
      return (/^.*@meteor.com$/.test(Users.findOne(userId).services.github.email));
    } catch (e) {
      return false;
    }
  }
});

