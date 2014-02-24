

permissions = {

  ownsDocument: function ( userId, doc ) {
    return doc.userId == userId;
  },

  allowedToEditDocument: function ( userId, doc ) {
    return ( userHelper.isCurrentUserAdmin() || permissions.ownsDocument( userId, doc) );
  }

};