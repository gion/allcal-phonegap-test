'use strict';

/**
 * @ngdoc service
 * @name allcalPhonegapTestApp.alarm
 * @description
 * # alarm
 * Factory in the allcalPhonegapTestApp.
 */
angular.module('allcalPhonegapTestApp')
  .factory('alarmFactory', function (phonegapNotification) {

    function Alarm(name, date) {
      this.id = 'alarm-' + new Date().getTime();
      this.name = name;
      this.date = moment(date).toDate();
      this.fullDate = moment(date).toDate();
      this.enabled = false;
    }

    Alarm.prototype = {
      destroy: function() {
        this.enabled = false;
      }
    };

    Object.defineProperty(Alarm.prototype, 'enabled', {
      get: function() {
        return this._enabled;
      },
      set: function(value) {
        this._enabled = !!value;
        this.enabledText = this._enabled ? 'enabled :)' : 'disabled :(';

        if(this._enabled) {
          // setup local notification on phonegap
          phonegapNotification.schedule({
            id: this.id,
            title: this.name,
            text: 'the ""' + this.name + '" alarm!"',
            at: this.date
          });
        } else {
          // cancel local notification
          phonegapNotification.cancel(this.id);
        }
      }
    });

    return {
      create: function (name, date) {
        return new Alarm(name, date);
      },
      constructor: Alarm
    };
  });
