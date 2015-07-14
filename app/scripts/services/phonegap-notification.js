'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.phonegapNotification
 * @description
 * # phonegapNotification
 * Factory in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .factory('phonegapNotification', function (phonegapApi) {
    if(!phonegapApi) {
      return {
        schedule: angular.noop,
        cancel: angular.noop
      };
    }

    return phonegapApi.plugins.notification.local;
  });
