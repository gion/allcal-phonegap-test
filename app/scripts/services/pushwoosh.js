'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.pushWoosh
 * @description
 * # pushWoosh
 * Service in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .service('pushWoosh', function (credentials) {
    // https://www.pushwoosh.com/programming-push-notification/android/android-additional-platforms/phonegapcordova-sdk-integration/
    // https://cp.pushwoosh.com/applications/B44DC-3ACA1

    var api = this;

    api.init = function() {
      console.log('init pushwoosh');

      plugins.pushNotification.onDeviceReady({
        projectid: credentials.google.projectNumber,
        pw_appid : credentials.pushwoosh.id
      });

      //register for pushes
        plugins.pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            credentials.pushwoosh.pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
      );

      api._bindEvents();
    };

    api._bindEvents = function() {
      document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;

        api.callbacks.forEach(function(fn) {
          fn(event, title, userData);
        });
      });
    };

    api.addPushCallback = function(fn) {
      api.callbacks.push(fn);
    };

    api.removePushCallback = function(fn) {
      var index = api.callbacks.indexOf(fn);

      if(index !== -1) {
        api.callbacks.splice(index, 1);
      }
    };
  });
