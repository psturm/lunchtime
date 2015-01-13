

Template.minimal.helpers({
    group : function () {
        return Groups.findOne({members: Meteor.userId()});
    }
});
