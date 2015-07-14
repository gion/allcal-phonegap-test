'use strict';

describe('Service: phonegapNotification', function () {

  // load the service's module
  beforeEach(module('allcalPhonegapTestApp'));

  // instantiate service
  var phonegapNotification;
  beforeEach(inject(function (_phonegapNotification_) {
    phonegapNotification = _phonegapNotification_;
  }));

  it('should do something', function () {
    expect(!!phonegapNotification).toBe(true);
  });

});
