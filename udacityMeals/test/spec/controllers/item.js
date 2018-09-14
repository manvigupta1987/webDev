'use strict';

describe('Controller: ItemctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('udacityMeals'));

  var ItemctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemctrlCtrl = $controller('ItemctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemctrlCtrl.awesomeThings.length).toBe(3);
  });
});
