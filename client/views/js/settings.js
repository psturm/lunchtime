/*
if (window.webkitNotifications) {
  console.log("Notifications are supported!");
} else {
  console.log("Notifications are not supported for this Browser/OS version yet.");
}


Template.settings.events({
  'click button' : function (ev, tmpl) {

    if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
      window.webkitNotifications.createNotification('icon.png', 'Notification Title', 'Notification content...');
      console.log('sending notification');
    } else {
      window.webkitNotifications.requestPermission();
      console.log('req perm');
    }
  }
});
  */