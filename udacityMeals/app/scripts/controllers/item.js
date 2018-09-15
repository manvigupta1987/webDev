'use strict';

/**
 * @ngdoc function
 * @name udacityMeals.controller:ItemctrlCtrl
 * @description
 * # ItemctrlCtrl
 * Controller of the udacityMeals
 */
angular.module('udacityMeals')
  .controller('ItemCtrl', ['$stateParams', 'foodFinder', function($stateParams, foodFinder) {
  	var vm = this;
  	//id can be fetched using the stateParams.
  	foodFinder.getItem($stateParams.id).then(function(data) {
      vm.data = data;
    });
  }]);