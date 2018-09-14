'use strict';

/**
 * @ngdoc service
 * @name udacityMeals.foodFinder
 * @description
 * # foodFinder
 * Service in the udacityMeals.
 */
angular.module('udacityMeals')
  .service('foodFinder', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vm = this;
    $.ajax({
    	url:'/menu/menu.json',
    	dataType: "json",
    	async: false,
    	success: function(data){
    		vm.menuItems = data;
    	}
    });
  });
