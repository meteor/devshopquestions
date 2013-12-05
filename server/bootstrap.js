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


