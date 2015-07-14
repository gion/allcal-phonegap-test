'use strict';

/**
 * @ngdoc function
 * @name allcalPhonegapTestApp.controller:AlarmCtrl
 * @description
 * # AlarmCtrl
 * Controller of the allcalPhonegapTestApp
 */
angular.module('allcalPhonegapTestApp')
  .controller('AlarmCtrl', function (alarmFactory) {
    this.alarms = [];

    this.createAlarm = function() {
      this.alarms.push(alarmFactory.create.apply(alarmFactory, arguments));
    };

    this.removeAlarm = function(alarm) {
      this.alarms.splice(this.alarms.indexOf(alarm), 1);
      alarm.destroy();
    };
  });
