Question = {
  text: String,
  location: String,
  timestamp: Date,
  flagged: Boolean,
  answered: Boolean,
  poster: {
    name: String,
    emailMd5: String,
    id: String
  },
  _id: String
};

Questions = new Meteor.Collection("questions");

if (Meteor.isServer) {
  Meteor.startup(function () {
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
          id: ""
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
          id: ""
        }
      }], function (x) {
        Questions.insert(x);
      });
  });

  Meteor.publish("questions", function () {
    return Questions.find({});
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
  });
} else {
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

