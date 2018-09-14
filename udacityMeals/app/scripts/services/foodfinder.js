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
    this.getMenu = function() {
      return $.get( '/menu/menu.json' );
    };
  });
