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
		return {
			carList: this.store.find('car'),
			tempCar: Ember.Object.create({})
		};
	}
});

App.CarsController = Ember.ObjectController.extend({
	error: "",
	actions: {
		delete: function(car) {
			car.destroyRecord();
		},
		newCar: function() {		
			var tempCar = this.get('tempCar');	
			if ( (typeof tempCar.get('make') === 'undefined') ||
			      typeof tempCar.get('carModel') === 'undefined')
			{
				this.set('error', 'Please populate all required fields');
				return;
			}

			var newCar = this.store.createRecord('car');
			newCar.set('make', tempCar.get('make'));
			newCar.set('carModel', tempCar.get('carModel'));
			newCar.save();

			this.set('error', '');
			this.set('tempCar', Ember.Object.create({}) );
			
		}
	}
});

