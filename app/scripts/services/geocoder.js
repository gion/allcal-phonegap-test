'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.geocoder
 * @description
 * # geocoder
 * Factory in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .factory('geocoder', function ($q) {

    // Public API here
    return {
      reverseGeocode: function (latlng) {
        var defer = $q.defer(),
            geocoder = new google.maps.Geocoder();

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
            defer.resolve(results[1]);
            } else {
              defer.reject('No results found');
            }
          } else {
            defer.reject('Geocoder failed due to: ' + status);
          }
        });

        return defer.promise;
      }
    };
  });
