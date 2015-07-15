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
      },

      getCurrentPosition: function(options) {
        var defer = $q.defer(),
            defaultOptions = {
              enableHighAccuracy: true,
              maximumAge: 10 * 1000,
              timeout: 5000
            },
            o = angular.extend(defaultOptions, options);

        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              // just to show how to access latitute and longitude
              var location = [position.coords.latitude, position.coords.longitude];
              console.log(location);
              defer.resolve(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          }, function(error) {
              // error getting GPS coordinates
              defer.reject('code: ' + error.code + ' with message: ' + error.message + '\n');
          }, o);
        } else {
          defer.reject('not in phonegap or geolocation not available');
        }

        return defer.promise;
      }
    };
  });
