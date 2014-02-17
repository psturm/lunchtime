
// Location list

Template.groupList.groups = function () {
  return Groups.find({}, {sort: {name: 1}});
};




// Single group

Template.group.helpers({
  hasGroupMembers: function () {
    return this.members.length > 0;
  },
  countGroupMembers: function () {
    var text = this.members.length + ' member';
    return this.members.length < 2 ? text : text + 's';
  },
  isGroupMember: function () {
    return _.contains(this.members, Meteor.userId());
  },
  isGroupAdmin: function () {
    return userHelper.isCurrentUserAdmin();
  }
});


Template.group.members = function () {
  return userHelper.getUsersByIds( this.members );
};

Template.group.choiceDateText = function () {
  if ( this.choice && this.choice.date ) {
    var date = new Date( this.choice.date );
    return date.toString();
  } else {
    return '';
  }
};



Template.group.groupLocations = function () {
  var locationIdsMultiple = userHelper.getLocationsByUserIds( this.members );
  return locationHelper.getAllSortedLocationsByIdsMultiple( locationIdsMultiple );
};

Template.group.events({
  'click .group-join' : function ( ev, tmpl ) {
    var groupName = this.name;
    Meteor.call('groupJoin', this._id, Meteor.userId(), true, function (error, result) {
      if (error) {
        flashMessenger.add('Failed to join group  "' + groupName + '".', flashMessenger.status.error);
      }
    });
  },
  'click .group-leave' : function ( ev, tmpl ) {
    var groupName = this.name;
    Meteor.call('groupJoin', this._id, Meteor.userId(), false, function (error, result) {
      if (error) {
        flashMessenger.add('Failed to leave group  "' + groupName + '".', flashMessenger.status.error);
      }
    });
  },

  'click .group-location-set-new' : function () {
    Meteor.call('groupSetNewRandomLocation', this, function (error, result) {
      if (error) {
        flashMessenger.add('Failed to reset group location!', flashMessenger.status.error);
      }
    });
  },
  'click .group-location-reset' : function () {
    Meteor.call('groupLocationReset', this, function (error, result) {
      if (error) {
        flashMessenger.add('Failed to reset group location!', flashMessenger.status.error);
      }
    });
  }

});


