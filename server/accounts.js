Accounts.onCreateUser(function(options, user) {

  user.username = options.email.split("@")[0];

  user.profile = {};

  user.locations = [];

  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});




