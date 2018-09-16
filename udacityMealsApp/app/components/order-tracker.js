import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	orderManager: service('order-manager'),
	actions: {
		remove(day, menuCate){
			this.get('orderManager').removeMenuItem(day, menuCate);
		},
		setDayTo(day){
			this.get('orderManager').setSelectedDay(day);
		}
	}
});
