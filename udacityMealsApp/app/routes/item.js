import Route from '@ember/routing/route';
import $ from 'jquery'

export default Route.extend({
	model(params){
		let menuItem = params.item_name;
    	return $.get( `/menu/${menuItem}.json` );
	}
});
