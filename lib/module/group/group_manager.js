

groupManager = {

  getAllGroups: function () {
    return Groups.find().fetch();
  },


  resetGroupLocation: function ( group ) {

    if ( group.choice ) {
      // there is an existing location ..
      if (Meteor.isClient && !userHelper.isCurrentUserAdmin() ) {
        var isChoiceFromToday = dateHelper.isDateToday(group.choiceDate);
        if ( isChoiceFromToday ) {
          throwError(500, "Location for today already set!");
        }
      }

      group.choice = null;
      Groups.update({_id: group._id}, group);
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
  }



};