

locationHelper = {

  getLocationById: function( locationId ) {
    return Locations.findOne( locationId );
  },

  getLocationsByIds: function( locationIds ) {
    return Locations.find({_id: {$in: locationIds}}).fetch();
    //return Locations.find({votes : userId}).fetch();
  },

  getAllSortedLocationsByIdsMultiple: function ( locationIdsMultiple ) {
    var locations = this.getLocationsByIds( locationIdsMultiple );
    locations = this.addCountsToLocations( locations, locationIdsMultiple );
    return this.sortLocationsByCount( locations );
  },



  addCountsToLocations: function (locations, locationIdsMultiple)  {
    return _.map(locations, function (loc) {
      var re = new RegExp(loc._id, 'g');
      loc.count = locationIdsMultiple.toString().match(re).length;
      return loc;
    });
  },

  sortLocationsByCount: function ( locations ) {
    return locations.sort(function (a,b) {
      if (a.count < b.count)
        return 1;
      if (a.count > b.count)
        return -1;
      return 0;
    });
  }


};