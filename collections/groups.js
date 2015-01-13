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
    if ( Meteor.isServer && ! group.choice ) {
      var locationIdsMultiple = userHelper.getLocationsByUserIds( group.members );
      console.log('locationIdsMultiple', locationIdsMultiple);
      var randomIdx = Math.floor(Math.random() * locationIdsMultiple.length);
      console.log('randomIdx', randomIdx);
      var randomLocationId = locationIdsMultiple[randomIdx];
      var randomLocation = locationHelper.getLocationById( randomLocationId );

      if ( randomLocation ) {
        group.choice = {
          date: new Date(),
          user: Meteor.user(),
          location: randomLocation
        };
        Groups.update({_id: group._id}, group);
      } else {
        throwError( 400, 'No groups to select from!' );
      }
    }
  },
  groupLocationReset: function ( group ) {
    return groupManager.resetGroupLocation( group );
  },

  groupResetVoteToggle: function ( group ) {
    if ( ! group.resetVotes ) {
      group.resetVotes = [];
    }

    var userId = Meteor.userId();
    if ( _.contains(group.resetVotes, userId) ) {
      Groups.update({_id: group._id}, {$pull: {resetVotes: userId}});

    } else {
      group.resetVotes.push( userId );
      Groups.update({_id: group._id}, {$addToSet: {resetVotes: userId}});
    }
  }

});