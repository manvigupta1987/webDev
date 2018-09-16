import Component from '@ember/component';
import Ember from 'ember';

export default Ember.Component.extend({
	orderManager: Ember.inject.service('order-manager')
});
