App = Ember.Application.create({
	LOG_TRANSITIONS: true, 
	LOG_TRANSITIONS_INTERNAL: true
});


App.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'carstore-data'
});

App.Car = DS.Model.extend({
	make: DS.attr('string'),
	carModel: DS.attr('string')
});

App.Router.map(function() {
	this.resource('cars');
	this.resource('create', { path: 'cars/create' });
	this.resource('car', { path: 'cars/:car_id'	});	
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('cars');
	}
});

App.CarsRoute = Ember.Route.extend({
	model: function() {
		var dbg = 1;
		return {
			carList: this.store.find('car')
		};
	},
	actions: {
		delete: function(car) {
			car.destroyRecord();
		}
	}
});

App.CreateRoute = Ember.Route.extend({
	model: function() {
		return this.store.createRecord('car');
	}
});

App.CreateController = Ember.ObjectController.extend({
	error: "",
	actions: {
		submit: function(car) {
			car.save();
			this.transitionToRoute('cars');
		}
	}
});

