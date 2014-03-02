

groupManager = {

  getAllGroups: function () {
    return Groups.find().fetch();
  },


  resetGroupLocation: function ( group ) {

    if ( group.choice ) {
      if ( permissions.canResetGroupLocation( group )) {
        group.choice = null;
        group.resetVotes = [];
        Groups.update({_id: group._id}, group);

      } else {
        throwError(500, "Location for today already set!");
        return false;
      }
    }

  },

  resetAllGroupLocations: function () {
    _.each(this.getAllGroups(), function (group) {
      groupManager.resetGroupLocation( group );
    });

  },


  removeAllMembersFromGroup: function ( group ) {
    console.log('Removing all members from group', group.name);
    Groups.update(group._id, { $set: {members: []} });
  },
  removeAllMembersFromAllGroups: function () {
    var allGroups = this.getAllGroups();
    _.each( allGroups, function ( group ) {
      groupManager.removeAllMembersFromGroup( group );
    });
  },

  isPercentageOfResetVotesCritical: function ( group ) {
    var percentage = this.getPercentageOfResetVotes( group );
    return percentage >= 0.5;
  },
  getPercentageOfResetVotes: function ( group ) {
    var countMember = group.members.length;
    var countResetVotes = group.resetVotes.length;
    return countResetVotes / countMember;
  }

};