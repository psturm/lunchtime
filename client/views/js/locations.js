
// Location list

Template.locations.locations = function () {
  return Locations.find({}, {sort: {score: -1, name: 1}});
};

Template.locations.helpers({
  showLocationEdit: function () {
    return Session.get('showEditLocation');
  }
});

Template.locations.events({
  'click #location-add-new' : function () {
    locationEditor.show();
  },
  'click .modal .btn-success' : function() {
    var name = $('#locationName').val();
    var nickname = $('#locationNickname').val();
    if ( locationHelper.createNewLocation( Meteor.userId(), name, nickname ) ) {
      locationEditor.hide();
    } else {
      flashMessenger.add('Could not add new location!', flashMessenger.status.error);
    }
  },
  'click .location-remove' : function ( ev, tmpl ) {
    if ( confirm('Do you really want to remove location "' + this.name + '"?') ) {
      var locationName = this.name;
      Meteor.call('locationRemove', this, function (error, result) {
        if (error) {
          flashMessenger.add('Failed to remove location  "' + locationName + '".', flashMessenger.status.error);
        }
      });
    }
  }
});

Template.locationEdit.events({
  'click .closeLocationEdit' : function () {
    locationEditor.hide();
  }
});


locationEditor = {
  show : function () {
    Session.set('showEditLocation', true);
    $('#locationName').focus();
  },
  hide : function () {
    Session.set('showEditLocation', false);
  }
};


// Single Location

Template.location.helpers({
  hasVoteOfCurrentUser: function () {
    return _.contains(this.votes, Meteor.userId());
  },
  cssClassHasVote: function () {
    return _.contains(this.votes, Meteor.userId()) ? ' list-group-item-success' : '';
  },
  allowedToEdit: function () {
    return permissions.allowedToEditDocument( Meteor.userId(), this );
  }
});


Template.location.events({
  'click .location-vote-pro' : function (ev, tmpl) {
    var locationName = this.name;
    Meteor.call('locationVote', this._id, Meteor.userId(), true, function (error, result) {
      if (error) {
        flashMessenger.add('Failed to like location "' + locationName + '".', flashMessenger.status.error);
      }
    });
    },
  'click .location-vote-con' : function (ev, tmpl) {
    var locationName = this.name;
    Meteor.call('locationVote', this._id, Meteor.userId(), false, function (error, result) {
      if (error) {
        var text = 'Failed to removed like from location "' + locationName + '".';
        text += ' (' + error.reason + ')';
        flashMessenger.add(text, flashMessenger.status.error);
      }
    });
  }
});



