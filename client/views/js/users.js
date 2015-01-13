
Template.userList.helpers = ({
    users : function () {
        return Meteor.users.find({}, {sort: {username: 1}});
    }
});

Template.user.helpers({
  isSelf: function () {
    return Meteor.userId() === this._id;
  },
  cssClassUser: function () {
    if (Meteor.userId() === this._id) {
      return 'list-group-item-info';
    } else if (userHelper.isUserOnline(this)) {
      return 'list-group-item-success';
    }
    return '';
  },
  isOnline: function () {
    return userHelper.isUserOnline(this);
  }
});


