'use strict';

/**
 * @ngdoc function
 * @name udacityMeals.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the udacityMeals
 */

//controller lives inside the module. controller is the constructor function, properties of the
//constructor function can be used in the template.
angular.module('udacityMeals')
//service foodFinder is injected into the controller. To use the service controller needs to store
//service i.e menu
  .controller('MenuCtrl', ['foodFinder','orderManager', function (menu, orderManager) {
    this.items = menu.menuItems;
    this.increment = function(item){
      item.rating = ((item.rating*10) + 1)/10;
    };
    this.decrement = function(item) {
      item.rating = ((item.rating*10) - 1)/10;
    };
    this.chooseItem = function(meal, name){
      orderManager.chooseMenuOption(meal, name);
    };
  }]);

