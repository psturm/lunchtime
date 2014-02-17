FlashMessages = new Meteor.Collection(null);


Template.flashMessageList.helpers({
  flashMessages: function () {
    return FlashMessages.find();
  }
});

Template.flashMessage.helpers({
  isStatusSuccess: function () {
    return (this.status == flashMessenger.status.success);
  },
  isStatusError: function () {
    return (this.status == flashMessenger.status.error);
  },
  messageCssClass: function () {
    switch (this.status) {
      case flashMessenger.status.error:
        return 'list-group-item-danger';
      case flashMessenger.status.success:
        return 'list-group-item-success';
      default:
        return 'list-group-item-notice';
    }
  }
});

Template.flashMessage.events({
  'click .flash-message-set-seen' : function ( ev, tmpl ) {
    flashMessenger.setSeen(this._id);
  }
});




flashMessenger = {

  timeout: 5000,
  status: {
    notice: 'NOTICE',
    success: 'SUCCESS',
    error: 'ERROR'
  },

  add: function (msg, status) {
    if (! status) {
      status = this.status.notice;
    }

    var newMessageId = FlashMessages.insert({
      message: msg,
      status: status
    });

    Meteor.setTimeout(function() {
      flashMessenger.setSeen(newMessageId);
    }, flashMessenger.timeout);
  },

  setSeen: function (messageId) {
    FlashMessages.remove(messageId);
  }

};

