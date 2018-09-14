'use strict';

/**
 * @ngdoc service
 * @name udacityMeals.orderManager
 * @description
 * # orderManager
 * Service in the udacityMeals.
 */
angular.module('udacityMeals')
  .service('orderManager', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var selectedDay = 'Monday';

    var orderSelection = {
      Monday: {
		breakfast: '',
		lunch: '',
		dinner: ''
      },
      Tuesday: {
		breakfast: '',
		lunch: '',
		dinner: ''
      },
      Wednesday: {
		breakfast: '',
		lunch: '',
		dinner: ''
      },
      Thursday: {
		breakfast: '',
		lunch: '',
		dinner: ''
      },
      Friday: {
		breakfast: '',
		lunch: '',
		dinner: ''
      }
    };
    this.getActiveDay = function() {
    	return this.selectedDay;
    };
    this.setActiveDay = function(day) {
    	selectedDay = day;
    };
    this.getOrders = function(){
    	return orderSelection;
    };
    this.chooseMenuOption = function(meal, menuItem) {
    	return orderSelection[selectedDay][meal] = menuItem;
    }
    this.removeMenuOption = function(day, meal) {
    	orderSelection[day][meal] = '';
    }
  });
