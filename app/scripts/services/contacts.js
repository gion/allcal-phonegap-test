'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.contacts
 * @description
 * # contacts
 * Service in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .service('contactsService', function (phonegapApi, $q) {

    var self = this;

    self.find = findContacts;

    function findContacts(query) {
      if(self.defer) {
        self.defer.reject('another query has been trigggered');
      }

      self.defer = $q.defer();

      var success = function success() {
            defer.resolve.apply(defer, arguments);
          },
          error = function error() {
            defer.reject.apply(defer, arguments);
          },
          options = new ContactFindOptions(),
          fields = ['displayName', 'name'];

      options.multiple = true;
      options.filter = query;

      navigator.contacts.find(fields, success, error, options);

      return self.defer.promise;
    }
  });
