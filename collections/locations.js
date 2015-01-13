Locations = new Meteor.Collection("locations");


Locations.allow({
  insert: function ( userId, doc ) {
    return permissions.allowedToEditDocument( userId, doc );
  },
  update: function ( userId, doc, fields, modifier ) {
    // TODO: check modifier for userId changes
    return userHelper.isAdmin();
  },
  remove: function ( userId, doc ) {
    return permissions.allowedToEditDocument( userId, doc );
  },
  fetch: ['userId']
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
  },

  locationRemove : function ( location ) {

    if ( permissions.allowedToEditDocument( Meteor.userId(), location ) ) {
      Meteor.users.update( {}, {$pull: {locations: location._id}} );
      Locations.remove( location._id );
      return true;
    } else {
      throwError(403, 'Not allowed to remove this location.');
    }

  }
});
