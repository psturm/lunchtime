

Template.minimal.helpers({

});

Template.minimal.group = function () {
  return Groups.findOne({members: Meteor.userId()});
};
