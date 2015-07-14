'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.phonegapApi
 * @description
 * # phonegapApi
 * Factory in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .factory('phonegapApi', function ($window) {
    // Public API here
    return $window.cordova || null;
  });
