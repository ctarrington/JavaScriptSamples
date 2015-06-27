App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
});


App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'candystore-data'
});

App.Candy = DS.Model.extend({
    name: DS.attr('string'),
    size: DS.attr('string')
});

App.Router.map(function() {
    this.resource('candyList');
    this.resource('create', { path: 'candy/create' });
    this.resource('candy', { path: 'candy/:candy_id'	});
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('candyList');
    }
});

App.CandyListRoute = Ember.Route.extend({
    model: function() {
        var dbg = 1;
        return {
            candyList: this.store.find('candy')
        };
    },
    actions: {
        delete: function(candy) {
            candy.destroyRecord();
        }
    }
});

App.CreateRoute = Ember.Route.extend({
    model: function() {
        return this.store.createRecord('candy');
    }
});

App.CreateController = Ember.ObjectController.extend({
    error: "",
    actions: {
        submit: function(candy) {
            candy.save();
            this.transitionToRoute('candyList');
        }
    }
});
