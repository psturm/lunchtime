

permissions = {

  ownsDocument: function ( userId, doc ) {
    return doc.userId == userId;
  },

  allowedToEditDocument: function ( userId, doc ) {
    return ( userHelper.isCurrentUserAdmin() || permissions.ownsDocument( userId, doc) );
  },

  canResetGroupLocation: function ( group ) {
    if ( userHelper.isCurrentUserAdmin() ) {
      return true;
    }
    if ( groupManager.isPercentageOfResetVotesCritical( group ) ) {
      return true;
    }

    var isChoiceFromToday = dateHelper.isDateToday(group.choiceDate);
    if ( group.choiceDate && !isChoiceFromToday ) {
      return true;
    }

    return false;
  }

};