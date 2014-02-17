
Meteor.startup(function () {


  if (Meteor.users.find().count() == 0) {
    console.log('database: install default user ...');
    Meteor.users.insert({
      "_id" : "cfrgFuyGeL4mhtNXr",
      "createdAt" : new Date(),
      "emails" : [  {  "address" : "paul@mailinator.com",  "verified" : false } ],
      "locations" : [],
      "services" : {
        "password" : {
          "srp" : {
            "identity" : "NR8AkrY2rxCWejyxW",
            "salt" : "MRrmHRpp6inwLFyvs",
            "verifier" : "442929a917be3a34c495ab8dce82354ab3bcc67091288f6a436f99bedf721b2fbd8fc04a144ab8bc423ff262803ffbf68dbf91a3f05177b06b57b8e42f99065cf8f60d3a3b3035f25e3870297053a539e58074326ebb7dd04d82bddea1e1c24e9909f0c7fec650457b314a48b9743f162e5c3cc3ffd4bd6486d18fbec78eb591"
          }
        },
        "resume" : {
          "loginTokens" : []
        }
      },
      "username" : "paul",
      "profile": {
        "admin": true
      }
    });
  }




  if (Groups.find().count() == 0) {
    console.log("database: group init ..");

    Groups.insert({
      name: "Default Lunch Group",
      details: {
        startTime: "12:30"
      },
      members: [],
      choice: null
      /*choice: {
        date: null,
        user: null,
        location: null
      }*/
    });

  }

});

Meteor.startup(function () {

  var locations = [
    ["Pizza", "Schrei-Italiener"],
    ["Soup a Cabana", null],
    ["RisOtto", "Bonzenreis"],
    ["Japanese Deli", null],
    ["Honigmond", null],
    ["Yuuka", "Frittier-Asiate"],
    ["Kyo", null],
    ["Vertigo", "Tellermann"]
  ];

  if (Locations.find().count() == 0) {
    _.each(locations, function (loc) {

      Locations.insert({
        name: loc[0],
        nickname: loc[1] || null,
        score: 0,
        votes: []
      });

      console.log("Added Location '" + loc[0] + "'");
    });

  }


});

