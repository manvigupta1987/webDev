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
	$urlRouterProvider.otherwise('/');
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
}]); //indicates that udacityMeals module is not depended on any other module.
//angular.module('udacityMeals', ['dep1', 'dep2']); //indicates that udacityMeals module depends on dep1 and dep2 modules.

//to get the module, we can use the syntax:
// angular.module('udacityMeals');

