'use strict';

describe('Controller: AlarmCtrl', function () {

  // load the controller's module
  beforeEach(module('allcalPhonegapTestApp'));

  var AlarmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlarmCtrl = $controller('AlarmCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AlarmCtrl.awesomeThings.length).toBe(3);
  });
});
