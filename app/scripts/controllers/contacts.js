'use strict';

/**
 * @ngdoc function
 * @name allcalPhonegapTestApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the allcalPhonegapTestApp
 */
angular.module('allcalPhonegapTestApp')
  .controller('ContactsCtrl', function (contactsService, $scope) {
    var vm = this;

    window.vm = vm;

    vm.searchedContact = null;
    vm.selectedContact = null;
    vm.contactList = [];
    vm.allContactsList = [];

    document.addEventListener('deviceready', init);

    function init() {
      contactsService.getAllContacts(function(contacts) {
        vm.allContactsList = contacts;
        $scope.$apply();
        console.log('cool', contacts);
      }, function() {
        vm.allContactsList = [];
        $scope.$apply();
        console.error('nooo', arguments);
      });
    }

    function _testSubstring(query, model) {
      return RegExp(query, 'i').test(model);
    }

    vm.search = function(query) {
      if(!vm.allContactsList) {
        return;
      }

      vm.selectedContact = null;

      vm.contactList = vm.allContactsList.filter(function(contact) {
        var models = [contact.displayName];

        if(contact.name) {
          models.concat(
            Object.keys(contact.name)
              .map(function(key) {
                return contact[key];
              })
              .filter(function(value) {
                return !!value;
              })
            );
        }

        for(var i=0; i<models.length; i++) {
          if(_testSubstring(query, contact.displayName)) {
            return true;
          }
        }

        return false;
      });
    };

    vm.select = function(contact) {
      vm.selectedContact = contact;
      vm.searchedContact = vm.selectedContact.displayName;
    };
  });
