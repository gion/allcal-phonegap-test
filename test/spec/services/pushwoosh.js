'use strict';

describe('Service: pushWoosh', function () {

  // load the service's module
  beforeEach(module('allcalPhonegapTestApp'));

  // instantiate service
  var pushWoosh;
  beforeEach(inject(function (_pushWoosh_) {
    pushWoosh = _pushWoosh_;
  }));

  it('should do something', function () {
    expect(!!pushWoosh).toBe(true);
  });

});
