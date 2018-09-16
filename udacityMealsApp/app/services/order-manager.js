import Service from '@ember/service';

export default Service.extend({
	selectedDay: 'Monday',
	menuSelection: {
		Monday: {},
		Tuesday: {},
		Wednesday: {},
		Thrusday: {},
		Friday: {},
		Saturday: {},
		Sunday: {}
	},
	setSelectedDay(day){
		this.set('selectedDay', day);
	},

	chooseMenuItem(menuCategory, menuItem){
		this.set('menuSelection.'+ this.get('selectedDay')+'.'+menuCategory, menuItem );
	},

	removeMenuItem(day, menuCategory){
		this.set('menuSelection.'+day+'.'+menuCategory, '');
	}
});
