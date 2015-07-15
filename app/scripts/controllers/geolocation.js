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

    //
    // var map;
    // function initialize() {
    //   map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     zoom: 8,
    //     center: {lat: -34.397, lng: 150.644}
    //   });
    // }
    //
    // geolocation.loading = true;
    // geolocation.error = null;
    // geolocation.selectedAddress = null;
    //
    // geolocation.clickHandler = function(event) {
    //   $timeout.cancel(timeout);
    //   geolocation.loading = true;
    //   geolocation.error = null;
    //   geolocation.selectedAddress = null;
    //
    //   geocoder.reverseGeocode(event.latLng)
    //     .then(function(result) {
    //       // console.log('success', result);
    //       geolocation.selectedAddress = result;
    //     })
    //     .catch(function(result) {
    //       geolocation.selectedAddress = null;
    //       // console.error('fail', result);
    //       geolocation.error = result;
    //     })
    //     .finally(function() {
    //       timeout = $timeout(function() {
    //         geolocation.loading = false;
    //       }, 500);
    //     });
    // };
    //
    // function init() {
    //   console.log('phonegap reaaaaady!');
    //
    //   initialize();
    //
    //   $scope.$on('mapInitialized', function(event, map) {
    //     geolocation.map = map;
    //
    //     console.log('mapInitialized', event, map);
    //
    //     geocoder.getCurrentPosition()
    //       .then(function(position) {
    //         geolocation.map.setCenter(position);
    //         map.setCenter(position);
    //       })
    //       .catch(function(errorMessage) {
    //         throw new Error(errorMessage);
    //         geolocation.error = errorMessage;
    //       })
    //       .finally(function() {
    //         geolocation.loading = false;
    //       });
    //   });
    // };
    //
    // phonegapReady(init);


    var key = 'AIzaSyB5a-L4dpBaneZ2oKfasJFWYw1-ez-wdP4';

    (function (global) {
        "use strict";

        function onDeviceReady () {
          alert('device ready');
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
          alert('try to load');
            if(navigator.connection.type === Connection.NONE || google.maps) {
                return;
            }
            $.getScript('https://maps.googleapis.com/maps/api/js?key='+ key +'&sensor=true&callback=onMapsApiLoaded');
        }

        global.onMapsApiLoaded = function () {
          alert('yeah');
            // Maps API loaded and ready to be used.
            var map = new google.maps.Map(document.getElementById("map-canvas"), {});
        };

        document.addEventListener("deviceready", onDeviceReady, false);
    })(window);
  });
