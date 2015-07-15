'use strict';

/**
 * @ngdoc function
 * @name allcalPhonegapTestApp.controller:GeolocationCtrl
 * @description
 * # GeolocationCtrl
 * Controller of the allcalPhonegapTestApp
 */
angular.module('allcalPhonegapTestApp')
  .controller('GeolocationCtrl', function ($scope, phonegapReady, geocoder, $timeout) {
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

    function init() {
      console.log('phonegap reaaaaady!');

      $scope.mapsLoaded = true;

      $scope.$on('mapInitialized', function(event, map) {
        geolocation.map = map;

        console.log('mapInitialized', event, map);

        geocoder.getCurrentPosition()
          .then(function(position) {
            geolocation.map.setCenter(position);
            map.setCenter(position);
          })
          .catch(function(errorMessage) {
            throw new Error(errorMessage);
            geolocation.error = errorMessage;
          })
          .finally(function() {
            geolocation.loading = false;
          });
      });
    };

    (function (global) {
      "use strict";

      var apiKey = 'AIzaSyB5a-L4dpBaneZ2oKfasJFWYw1-ez-wdP4';

      function onDeviceReady () {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
      }

      function onOnline () {
        loadMapsApi();
      }

      function onResume () {
        loadMapsApi();
      }

      function loadMapsApi () {
        if(navigator.connection.type === Connection.NONE || google.maps) {
          return;
        }
        $.getScript('https://maps.googleapis.com/maps/api/js?key='+ apiKey +'&sensor=true&callback=onMapsApiLoaded');
      }

      global.onMapsApiLoaded = init;

      document.addEventListener("deviceready", onDeviceReady, false);
    })(window);

  });
