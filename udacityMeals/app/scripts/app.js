'use strict';

/**
 * @ngdoc overview
 * @name udacityMeals
 * @description
 * # udacityMeals
 *
 * Main module of the application.
 */
angular.module('udacityMeals', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//to load the home state by default
	$urlRouterProvider.otherwise('/');
	//its used to set the different state of the app.
	$stateProvider
      .state('home', {
		url: '/',
		templateUrl: 'views/menu.html',
		controller: 'MenuCtrl as menu'
      })
      .state('item', {
		url: '/menu/item/:id',
		templateUrl: 'views/item.html',
		controller: 'ItemCtrl as item'
      })
      //for nested view --> we need the same name as the main view that this one will be nested inside.
      //Since nutrition and reviews are nested inside the item template so they are named like this.
      .state('item.nutrition', {
		url: '/nutrition',
		templateUrl: 'views/item-nutriton.html'
      })
      .state('item.reviews', {
		url: '/reviews',
		templateUrl: 'views/item-reviews.html'
      });
}]); //indicates that udacityMeals module is not depended on any other module.
//angular.module('udacityMeals', ['dep1', 'dep2']); //indicates that udacityMeals module depends on dep1 and dep2 modules.

//to get the module, we can use the syntax:
// angular.module('udacityMeals');

