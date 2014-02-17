// https://github.com/alexsuslov/Meteor.cron
//
// Attention: complex format NOT allowed! (like: */15 4-16 * * 6,7)
//
//

var crontab = new Meteor.Cron( {
  events: {
    "* * * * *"  : function() {
      console.log('cron minute tick');
    },
    "0 0 * * *"  : function() {
      console.log('CRON: resetting all group locations ...');
      groupManager.removeAllMembersFromAllGroups();
      groupManager.resetAllGroupLocations();
    }
  }
});