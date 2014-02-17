
// Location list

Template.locations.locations = function () {
  return Locations.find({}, {sort: {score: -1, name: 1}});
};




// Single Location

Template.location.helpers({
  hasVoteOfCurrentUser: function () {
    return _.contains(this.votes, Meteor.userId());
  },
  cssClassHasVote: function () {
    return _.contains(this.votes, Meteor.userId()) ? ' list-group-item-success' : '';
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



