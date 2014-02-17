
Meteor.publish("locations", function () {
  return Locations.find({}, {});
});

Meteor.publish("groups", function () {
  return Groups.find({}, {});
});

Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {'username': 1, locations: 1}});
});


// https://github.com/tmeasday/meteor-presence
Meteor.publish('userPresence', function() {
  var filter = {userId: {$exists: true}};

  //return Presences.find({}, {});

  // ProTip: unless you need it, don't send lastSeen down as it'll make your templates constantly re-render (and use bandwidth)
  return Meteor.presences.find(filter, {fields: {state: true, userId: true}});
});
