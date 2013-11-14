// {
//   text: String,
//   location: String,
//   timestamp: EJSON.Date,
//   flagged: Boolean,
//   answered: Boolean,
//   poster: {
//     name: String,
//     image: String (link)
//   }
// }
Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  Session.setDefault("editing-id", null);

  UI.body.active = function () {
    var templateName = Session.get("active-section");
    return Template[templateName];
  };

  Template.questions.questions = function () {
    return Questions.find({ answered: false });
  }
  Template.answeredQuesions.questions = function () {
    return Questions.find({ answered: true });
  }
  Template.question.rendered = function () {
    var self = this;
    self.questionTextHandle = Deps.autorun(function () {
      var text = Questions.findOne(self.data._id).text;
      var editing = IdIsEditing(self.data._id);
      Meteor.defer(function () {
        if (editing) {
          $(self.find("textarea")).text(text)
            .focusout(function () {
              var text = $(self.find("textarea")).val();
              Questions.update(self.data._id, { $set: { text: text } });
              Session.set("editing-id", null);
            });
        } else {
          var domNode = $(self.find(".question .text"));
          domNode.more("destroy");
          domNode.text(text)
            .more({ length: 300 });
        }
      });
    });
  };
  Template.question.destroyed = function () {
    if (this.questionTextHandle)
      this.questionTextHandle.stop();
  };
  Template.question.answered = function () {
    if (this.answered)
      return "answered-question";
    return "";
  };
  Template.question.prettyDate = function () {
    return relativeDate(this.timestamp);
  };
  Template.question.events({
    'click .active-ribbon, click .empty-ribbon': function (e) {
      Questions.update(this._id, { $set: { flagged: !this.flagged }});
    },

    'click [data-action=toggle-answered]': function () {
      Questions.update(this._id, { $set: { answered: !this.answered }});
    },
    'click [data-action=delete]': function () {
      Questions.remove(this._id);
    },

    'dblclick .text': function () {
      Session.set('editing-id', this._id);
    }
  });
  Template.question.editing = function () {
    return Session.equals("editing-id", this._id);
  }

  var timeDependency = new Deps.Dependency;
  var relativeDate = function (then) {
    timeDependency.depend();
    var now = new Date;
    var secondsAgo = Math.floor((now.getTime() - then.getTime()) / 1000);
    var minutesAgo = Math.floor(secondsAgo / 60);
    var hoursAgo = Math.floor(minutesAgo / 60);
    var daysAgo = Math.floor(hoursAgo / 24);

    if (minutesAgo < 1)
      return "just now";
    else if (hoursAgo < 1) {
      return minutesAgo + " minute" + (minutesAgo !== 1 ? "s" : "") + " ago";
    } else if (daysAgo < 1) {
      return hoursAgo + " hour" + (hoursAgo !== 1 ? "s" : "") + " ago";
    } else if (daysAgo < 40) {
      return daysAgo + " day" + (daysAgo !== 1 ? "s" : "") + " ago";
    } else
      return "Long long time ago";
  };

  Meteor.setInterval(function () {
    timeDependency.changed();
  }, 1000);

  function IdIsEditing (id) {
    return Session.equals("editing-id", id);
  }
}

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
          image: "http://upload.wikimedia.org/wikipedia/en/f/f9/Monkey-gun.jpg"
        }
      }, {
        text: "Echo Park excepteur Wes Anderson Pinterest, fugiat trust fund Cosby sweater McSweeney's 3 wolf moon XOXO organic bitters Portland Brooklyn. Put a bird on it Tonx cred, cardigan mustache keytar scenester. Irure laborum occupy Etsy craft beer. Swag Marfa distillery, nulla leggings disrupt gastropub small batch Thundercats dolore hoodie Brooklyn. Cosby sweater Shoreditch try-hard irony gluten-free. Church-key hella kogi, Truffaut enim next level chia pork belly photo booth fap Tonx. Blue Bottle mlkshk nesciunt mixtape sriracha typewriter, locavore retro meggings dolor Cosby sweater fanny pack.",
        location: "roof",
        timestamp: new Date(new Date - 1000*10*60),
        flagged: false,
        answered: false,
        poster: {
          name: "Hipster Hacker",
          image: "https://pbs.twimg.com/profile_images/1263403750/riverscuomo-mustache.jpg"
        }
      }], function (x) {
        Questions.insert(x);
      });
  });
}


