'use strict';

describe('Service: alarmFactory', function () {

  // load the service's module
  beforeEach(module('allcalPhonegapTestApp'));

  // instantiate service
  var alarmFactory;
  beforeEach(inject(function (_alarmFactory_) {
    alarmFactory = _alarmFactory_;
  }));

  it('should instantiate a new Alarm object', function () {
    var alarm = alarmFactory.create();
    expect(alarm instanceof alarmFactory.constructor).toBe(true);
  });

});
