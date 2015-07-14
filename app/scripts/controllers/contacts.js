'use strict';

/**
 * @ngdoc function
 * @name allcalPhonegapTestApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the allcalPhonegapTestApp
 */
angular.module('allcalPhonegapTestApp')
  .controller('ContactsCtrl', function (contactsService) {
    var vm = this;

    vm.selectedContact = null;
    vm.contactList = [];

    vm.search = function(query) {
      contactsService
        .find(query)
        .then(function(contacts) {
            vm.contactList = contacts;
        })
        .catch(function() {
          console.error('find contact failed:', arguments);
        });
    };

  });
