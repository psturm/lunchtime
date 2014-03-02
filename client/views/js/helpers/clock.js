
Template.clock.currentTime = function () {
  return clock.getCurrentTime();
};


clock = {

  tick : function () {
    Meteor.setTimeout(function () {
      Session.set('currentTime', new Date().toLocaleTimeString());
      clock.tick();
    }, 1000);
  },

  getCurrentTime: function () {
    return Session.get('currentTime');
  }

};
clock.tick();