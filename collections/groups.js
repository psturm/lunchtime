Groups = new Meteor.Collection("groups");



Meteor.methods({
  groupJoin : function (groupId, userId, join) {

    var groupModifier = join
      ? { $addToSet: {members: Meteor.userId()} }
      : { $pull: {members: Meteor.userId()} };

    if ( !userId || userId !== Meteor.userId() ) {
      throwError(403, 'Invalid user!');
      // TODO: check user is not in other group
    }

    Groups.update(groupId, groupModifier);
  },


  groupSetNewRandomLocation: function ( group ) {

    if (! group.choice ) {

      var locationIdsMultiple = userHelper.getLocationsByUserIds( group.members );
      var randomLocationId = locationIdsMultiple[Math.floor(Math.random() * locationIdsMultiple.length)];
      var randomLocation = locationHelper.getLocationById( randomLocationId );

      group.choice = {
        date: new Date(),
        user: Meteor.user(),
        location: randomLocation
      };

      Groups.update({_id: group._id}, group);
    }



  },
  groupLocationReset: function ( group ) {
    groupManager.resetAllGroupLocations();
  }

});