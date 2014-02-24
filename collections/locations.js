Locations = new Meteor.Collection("locations");


Locations.allow({
  insert: function (userId, doc) {
    var user = Meteor.users.findOne( {_id: userId} );
    return user && userHelper.isAdmin( user );
  },
  update: function (userId, doc, fields, modifier) {
    var user = Meteor.users.findOne( {_id: userId} );
    return user && userHelper.isAdmin( user );
  },
  remove: function (userId, doc) {
    var user = Meteor.users.findOne( {_id: userId} );
    return user && userHelper.isAdmin( user );
  },
  fetch: ['owner']
});






// todo: check arguments! http://docs.meteor.com/#match

Meteor.methods({
  locationVote : function (locationId, userId, voteUp) {

    var locationModifier = voteUp
      ? {$addToSet: {votes: userId}, $inc: {score: 1}}
      : {$pull: {votes: userId}, $inc: {score: -1}};

    var userModifier = voteUp
      ? {$addToSet: {locations: locationId}}
      : {$pull: {locations: locationId}};


    if ( !userId || userId !== Meteor.userId() ) {
      throwError(403, 'Invalid user!');
      // TODO: check more permissions!?
    }


    Locations.update(locationId, locationModifier);
    Meteor.users.update(userId, userModifier);

    return true;
  }
});
