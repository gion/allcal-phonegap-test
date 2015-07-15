'use strict';

/**
 * @ngdoc overview
 * @name allcalPhonegapTestApp
 * @description
 * # allcalPhonegapTestApp
 *
 * Main module of the application.
 */
angular
  .module('allcalPhonegapTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .when('/alarm', {
        templateUrl: 'views/alarm.html',
        controller: 'AlarmCtrl',
        controllerAs: 'alarm'
      })
      .when('/geolocation', {
        templateUrl: 'views/geolocation.html',
        controller: 'GeolocationCtrl',
        controllerAs: 'geolocation'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
