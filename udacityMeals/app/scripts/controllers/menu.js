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
  .controller('MenuCtrl', function () {
  	this.items = [
  		{
  			id : 'strawberry-pudding',
  			name : 'Strawberry Pudding',
  			img : 'yeoman.png',
  			rating : 5
  		},
  		{
  			id : 'chicken-pudding',
  			name : 'Chicken Pudding',
  			img : 'yeoman.png',
  			rating : 4.5
  		},
  		{
  			id : 'ham-goat-pudding',
  			name : 'Ham Goat Pudding',
  			img : 'yeoman.png',
  			rating : 4
  		}
  	];
  	this.increment = function(item){
  		item.rating = ((item.rating*10) + 1)/10;
  	};
  	this.decrement = function(item) {
  		item.rating = ((item.rating*10) - 1)/10;
  	};
  });
