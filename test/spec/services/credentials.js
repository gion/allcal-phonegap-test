'use strict';

describe('Service: credentials', function () {

  // load the service's module
  beforeEach(module('allcalPhonegapTestApp'));

  // instantiate service
  var credentials;
  beforeEach(inject(function (_credentials_) {
    credentials = _credentials_;
  }));

  it('should do something', function () {
    expect(!!credentials).toBe(true);
  });

});
