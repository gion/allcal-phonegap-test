'use strict';

describe('Service: phonegapApi', function () {

  // load the service's module
  beforeEach(module('allcalPhonegapTestApp'));

  // instantiate service
  var phonegapApi;
  beforeEach(inject(function (_phonegapApi_) {
    phonegapApi = _phonegapApi_;
  }));

  it('should do something', function () {
    expect(!!phonegapApi).toBe(true);
  });

});
