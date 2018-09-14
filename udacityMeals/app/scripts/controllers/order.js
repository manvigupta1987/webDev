'use strict';

/**
 * @ngdoc function
 * @name udacityMeals.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the udacityMeals
 */
angular.module('udacityMeals')
  .controller('OrderCtrl', ['orderManager', function (orderManager) {
  	this.list = orderManager.getOrders();
  	this.setActiveDay = function(day){
  		orderManager.setActiveDay(day);
  	};
  }]);
