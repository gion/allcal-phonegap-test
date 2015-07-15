'use strict';

/**
 * @ngdoc function
 * @name allcalPhonegapTestApp.controller:GeolocationCtrl
 * @description
 * # GeolocationCtrl
 * Controller of the allcalPhonegapTestApp
 */
angular.module('allcalPhonegapTestApp')
  .controller('GeolocationCtrl', function (NavigatorGeolocation, geocoder, $timeout) {
    var geolocation = this,
        timeout;

    geolocation.loading = true;
    geolocation.error = null;
    geolocation.selectedAddress = null;

    geolocation.clickHandler = function(event) {
      $timeout.cancel(timeout);
      geolocation.loading = true;
      geolocation.error = null;
      geolocation.selectedAddress = null;

      geocoder.reverseGeocode(event.latLng)
        .then(function(result) {
          // console.log('success', result);
          geolocation.selectedAddress = result;
        })
        .catch(function(result) {
          geolocation.selectedAddress = null;
          // console.error('fail', result);
          geolocation.error = result;
        })
        .finally(function() {
          timeout = $timeout(function() {
            geolocation.loading = false;
          }, 500);
        });
    };

    NavigatorGeolocation.getCurrentPosition()
      .then(function(position) {
        // console.log(arguments);
        geolocation.position = angular.toJson(position);
      })
      .finally(function() {
        geolocation.loading = false;
      });
  });
