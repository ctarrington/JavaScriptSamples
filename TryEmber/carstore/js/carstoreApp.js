App = Ember.Application.create();


App.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'carstore-data'
});

App.Car = DS.Model.extend({
	make: DS.attr('string'),
	carModel: DS.attr('string')
});

App.Router.map(function() {
	this.resource('cars', function() {
		this.route('new');
		this.route('details', { path: '/:id'});	
	});
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('cars');
	}
});

App.CarsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('car');
	}
});

App.CarsNewRoute = Ember.Route.extend({
	model: function() {
		return Ember.Object.create({});
	}
});

App.CarsController = Ember.ObjectController.extend({
	error: "",
	actions: {
		delete: function(car) {
			car.destroyRecord();
		}
	}
});

App.CarsNewController = Ember.ObjectController.extend({
	error: "",
	actions: {
		newCar: function() {
			var car = this.get('content');

			if ( (typeof car.get('make') === 'undefined') ||
			      typeof car.get('carModel') === 'undefined')
			{
				this.set('error', 'Please populate all required fields');
				return;
			}

			var newCar = this.store.createRecord('car');
			newCar.set('make', car.get('make'));
			newCar.set('carModel', car.get('carModel'));
			newCar.save();

			this.set('error', '');
			this.transitionToRoute('cars.details', car);
		}
	}
});

