
dateHelper = {

  isDateToday: function ( dateToCompare ) {
    if ( dateToCompare ) {
      var now = new Date();
      return dateToCompare.toDateString() == now.toDateString();
    }
    return false;
  }


};