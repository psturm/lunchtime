

userHelper = {


  getUsersByIds: function (ids) {
    return Meteor.users.find({_id: {$in: ids}}, {
      fields: {username: 1, locations: 1},
      sort: {username: 1}
    }).fetch();
  },

  isCurrentUserAdmin: function () {
    return this.isAdmin( Meteor.user() );
  },
  isAdmin: function (user) {
    return (user.profile && user.profile.admin);
  },

  isUserOnline: function (user) {
    return !!Meteor.presences.findOne({userId: user._id, state: "online"});
  },


  getLocationsByUserIds: function (userIds) {
    var users = this.getUsersByIds( userIds );
    return this.getLocationIdsByUsers( users );
  },

  getLocationIdsByUsers: function (users) {
    // returns an array of all locations (multiple occurences if liked by several users)
    var locationIds = [];
    _.each(users, function(user, idx) {
      if ( user.locations ) {
        locationIds = locationIds.concat(user.locations);
      }
    });
    return locationIds;
  }





};