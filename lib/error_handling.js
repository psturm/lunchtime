
throwError = function (error, reason, details) {
  var error = new Meteor.Error(error, reason, details);
  if (Meteor.isClient) {
    error;
  } else {
    throw error;
  }

};