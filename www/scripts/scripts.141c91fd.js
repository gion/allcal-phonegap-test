"use strict";angular.module("allcalPhonegapTestApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMap","btford.phonegap.ready"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/contacts",{templateUrl:"views/contacts.html",controller:"ContactsCtrl",controllerAs:"contacts"}).when("/alarm",{templateUrl:"views/alarm.html",controller:"AlarmCtrl",controllerAs:"alarm"}).when("/geolocation",{templateUrl:"views/geolocation.html",controller:"GeolocationCtrl",controllerAs:"geolocation"}).otherwise({redirectTo:"/"})}]),angular.module("allcalPhonegapTestApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("allcalPhonegapTestApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("allcalPhonegapTestApp").controller("ContactsCtrl",["contactsService","$scope",function(a,b){function c(){a.getAllContacts(function(a){e.allContactsList=a,b.$apply(),console.log("cool",a)},function(){e.allContactsList=[],b.$apply(),console.error("nooo",arguments)})}function d(a,b){return RegExp(a,"i").test(b)}var e=this;window.vm=e,e.searchedContact=null,e.selectedContact=null,e.contactList=[],e.allContactsList=[],document.addEventListener("deviceready",c),e.search=function(a){e.allContactsList&&(e.selectedContact=null,e.contactList=e.allContactsList.filter(function(b){var c=[b.displayName];b.name&&c.concat(Object.keys(b.name).map(function(a){return b[a]}).filter(function(a){return!!a}));for(var e=0;e<c.length;e++)if(d(a,b.displayName))return!0;return!1}))},e.select=function(a){e.selectedContact=a}}]),angular.module("allcalPhonegapTestApp").controller("AlarmCtrl",["alarmFactory",function(a){this.alarms=[],this.createAlarm=function(){this.alarms.push(a.create.apply(a,arguments))},this.removeAlarm=function(a){this.alarms.splice(this.alarms.indexOf(a),1),a.destroy()}}]),angular.module("allcalPhonegapTestApp").factory("alarmFactory",["phonegapNotification",function(a){function b(a,b){this.id="alarm-"+(new Date).getTime(),this.name=a,this.date=moment(b).toDate(),this.fullDate=moment(b).toDate(),this.enabled=!1}return b.prototype={destroy:function(){this.enabled=!1}},Object.defineProperty(b.prototype,"enabled",{get:function(){return this._enabled},set:function(b){this._enabled=!!b,this.enabledText=this._enabled?"enabled :)":"disabled :(",this._enabled?a.schedule({id:this.id,title:this.name,text:'the ""'+this.name+'" alarm!"',at:this.date}):a.cancel(this.id)}}),{create:function(a,c){return new b(a,c)},constructor:b}}]),angular.module("allcalPhonegapTestApp").factory("phonegapNotification",["phonegapApi",function(a){return a?a.plugins.notification.local:{schedule:angular.noop,cancel:angular.noop}}]),angular.module("allcalPhonegapTestApp").factory("phonegapApi",["$window",function(a){return a.cordova||null}]),angular.module("allcalPhonegapTestApp").service("contactsService",["phonegapApi","$q",function(a,b){function c(a){d.defer&&d.defer.reject("another query has been trigggered"),d.defer=b.defer();var c=function(){defer.resolve.apply(defer,arguments)},e=function(){defer.reject.apply(defer,arguments)},f=new ContactFindOptions,g=["displayName","name"];return f.multiple=!0,f.filter=a,navigator.contacts.find(g,c,e,f),d.defer.promise}var d=this;d.find=c,d.getAllContacts=function(a,b){var c=new ContactFindOptions;c.multiple=!0,c.filter="",navigator.contacts.find(["displayName","name"],a,b,c)}}]),angular.module("allcalPhonegapTestApp").controller("GeolocationCtrl",["$scope","phonegapReady","geocoder","$timeout",function(a,b,c,d){var e,f=this;f.loading=!0,f.error=null,f.selectedAddress=null,f.clickHandler=function(a){d.cancel(e),f.loading=!0,f.error=null,f.selectedAddress=null,c.reverseGeocode(a.latLng).then(function(a){f.selectedAddress=a})["catch"](function(a){f.selectedAddress=null,f.error=a})["finally"](function(){e=d(function(){f.loading=!1},500)})},b(function(){a.$on("mapInitialized",function(a,b){f.map=b,console.log("mapInitialized",a,b),c.getCurrentPosition().then(function(a){f.map.setCenter(a)})["catch"](function(a){throw new Error(a)})["finally"](function(){f.loading=!1})})})}]),angular.module("allcalPhonegapTestApp").factory("geocoder",["$q",function(a){return{reverseGeocode:function(b){var c=a.defer(),d=new google.maps.Geocoder;return d.geocode({location:b},function(a,b){b==google.maps.GeocoderStatus.OK?a[1]?c.resolve(a[1]):c.reject("No results found"):c.reject("Geocoder failed due to: "+b)}),c.promise},getCurrentPosition:function(b){var c=a.defer(),d={enableHighAccuracy:!0,maximumAge:1e4,timeout:5e3},e=angular.extend(d,b);return navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){var b=[a.coords.latitude,a.coords.longitude];console.log(b),c.resolve(new google.maps.LatLng(a.coords.latitude,a.coords.longitude))},function(a){c.reject("code: "+a.code+" with message: "+a.message+"\n")},e):c.reject("not in phonegap or geolocation not available"),c.promise}}}]),angular.module("allcalPhonegapTestApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/alarm.html",'<h2>Configure your alarms!</h2> <div ng-repeat="a in alarm.alarms track by a.id" class="alarm-container"> <span class="btn btn-small remove-alarm" ng-click="alarm.removeAlarm(a);"> <span class="glyphicon glyphicon-remove"></span> </span> <div class="row"> <div class="col-lg-6"> <div class="input-group"> <span class="input-group-addon"> <span class="glyphicon glyphicon-tag"></span> </span> <input type="text" class="form-control" ng-model="a.name" placeholder="alarm name"> </div> </div> <div class="col-lg-6"> <div class="input-group"> <span class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span> </span> <input type="date" class="form-control" ng-model="a.date"> </div> </div> <div class="col-lg-6"> <div class="input-group"> <span class="input-group-addon"> <span class="glyphicon glyphicon-time"></span> </span> <input type="time" class="form-control" ng-model="a.date"> </div> </div> <div class="col-lg-6"> <div class="input-group"> <span class="input-group-addon"> <input type="checkbox" ng-model="a.enabled"> </span> <input type="text" class="form-control" disabled ng-model="a.enabledText"> </div> </div> </div> </div> <button class="btn btn-success" ng-click="alarm.createAlarm();"> <span class="glyphicon glyphicon-plus"></span> add an<span ng-show="alarm.alarms.length > 0">other</span> alarm </button>'),a.put("views/contacts.html",'<h2>Search for a contact!</h2> <div class="row"> <div class="input-group"> <span class="input-group-addon"> <span class="glyphicon glyphicon-search"></span> </span> <input type="text" class="form-control" ng-model="contacts.searchedContact" data="contacts.contacts" ng-change="contacts.search(contacts.searchedContact)" placeholder="Search your phone contacts"> </div> </div> <div class="row contacts-wrapper" ng-if="contacts.contactList.length"> <div class="panel panel-default"> <div class="panel-body"> <div ng-repeat="contact in contacts.contactList track by contact.id" class="contact" ng-click="contacts.select(contact)"> <p>{{contact.displayName}}</p> <p class="small">{{contact.phoneNumbers[0].value}}</p> </div> </div> </div> </div> <div class="panel panel-default" ng-if="contacts.selectedContact"> <div class="panel-body"> <p>Do you want to give <strong>{{contacts.selectedContact.displayName}}</strong> a call?</p> <p> <a ng-href="tel://{{contacts.selectedContact.phoneNumbers[0].value}}" class="btn btn-success btn-large"> <span class="glyphicon glyphicon-earphone"></span> {{contacts.selectedContact.displayName}} </a> </p> </div> </div>'),a.put("views/geolocation.html",'<div class="geolocation-container loading" ng-class="{\'loading\':geolocation.loading}"> <div class="loader-container"> <div class="loader">Just a sec...</div> </div> <p>Navigate the map and select your event location:</p> <p ng-if="geolocation.selectedAddress">Would you like to set <strong>{{geolocation.selectedAddress.formatted_address}}</strong> as your event location?</p> <p ng-if="geolocation.error">Sorry, we seem to have encountered the following error: <strong>{{geolocation.error}}</strong>. Please try again or contact the administrator.</p> <map on-click="geolocation.clickHandler($event)"></map> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);