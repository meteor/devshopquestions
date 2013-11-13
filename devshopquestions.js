// {
//   text: String,
//   location: String,
//   timestamp: EJSON.Date,
//   flagged: Boolean
//   poster: {
//     name: String,
//     image: String (link)
//   }
// }
Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  UI.body.active = function () {
    var templateName = Session.get("active-section");
    return Template[templateName];
  };

  Template.questions.questions = function () {
    return Questions.find();
  }
  Template.question.rendered = function () {
    var self = this;
    self.questionTextHandle = Deps.autorun(function () {
      var text = Questions.findOne(self.data._id).text;
      $(self.find('.question-text')).text(text).more({ length: 300 });
    });
  };
  Template.question.destroyed = function () {
    if (this.questionTextHandle)
      this.questionTextHandle.stop();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (!Questions.find().count())
      _.each([{
        text: "lorem posum realtime ipsum minimongo short one",
        location: "front door",
        timestamp: (new Date),
        flagged: true,
        poster: {
          name: "Realtime monkey",
          image: "http://upload.wikimedia.org/wikipedia/en/f/f9/Monkey-gun.jpg"
        }
      }, {
        text: "Echo Park excepteur Wes Anderson Pinterest, fugiat trust fund Cosby sweater McSweeney's 3 wolf moon XOXO organic bitters Portland Brooklyn. Put a bird on it Tonx cred, cardigan mustache keytar scenester. Irure laborum occupy Etsy craft beer. Swag Marfa distillery, nulla leggings disrupt gastropub small batch Thundercats dolore hoodie Brooklyn. Cosby sweater Shoreditch try-hard irony gluten-free. Church-key hella kogi, Truffaut enim next level chia pork belly photo booth fap Tonx. Blue Bottle mlkshk nesciunt mixtape sriracha typewriter, locavore retro meggings dolor Cosby sweater fanny pack.",
        location: "roof",
        timestamp: new Date(new Date - 1000*10*60),
        flagged: false,
        poster: {
          name: "Hipster Hacker",
          image: "https://pbs.twimg.com/profile_images/1263403750/riverscuomo-mustache.jpg"
        }
      }], function (x) {
        Questions.insert(x);
      });
  });
}
