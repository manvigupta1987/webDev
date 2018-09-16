import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	orderManager: service('order-manager'),
	className: ['menu-item'],
	tagName: 'li',
	mealCategory: 'breakfast',
	actions: {
		changeCategory(Category){
			this.set('mealCategory', Category);
		},
		chooseItem(menuItem){
			this.get('orderManager').chooseMenuItem(this.get('mealCategory'),menuItem);
		}
	}
});
