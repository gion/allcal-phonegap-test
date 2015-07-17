'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.credentials
 * @description
 * # credentials
 * Factory in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .factory('credentials', function () {
    var credentials = {
      google: {
        projectNumber: 396336686152,
        projectId: 'arcane-trilogy-100714'
      },
      pushwoosh: {
        id: 'B44DC-3ACA1'
      }
    };

    return credentials;
  });
