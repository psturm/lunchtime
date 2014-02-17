
dateHelper = {

  isDateToday: function ( dateToCompare ) {
    var now = new Date();
    return dateToCompare.toDateString() == now.toDateString();
  }


};