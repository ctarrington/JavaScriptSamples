App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    rootElement : "#candy-application-root"
});

App.deferReadiness();
window.initializeCandyStore = function(opts) {
    App.advanceReadiness();
};


App.Router.reopen({
    location: 'none'
});

var candyListRaw = '\
{{#each candy in candyList}}\
{{#unless candy.isDirty}}\
<div class="row">\
    <div class="col-xs-2">{{candy.name}}</div>\
    <div class="col-xs-2">{{candy.size}}</div>\
    <div class="col-xs-2">{{#link-to "candy" candy}}Details{{/link-to}}</div>\
    <div class="col-xs-2"><button {{action "delete" candy }}>Delete</button></div>\
</div>\
{{/unless}}\
{{/each}}\
\
<div class="row">\
    <div class="col-xs-4">{{#link-to "create"}}Create Candy{{/link-to}}</div>\
</div>\
';


var candyRaw = '\
<div>{{name}}</div>\
<div>{{size}}</div>\
{{#link-to "candyList"}}List{{/link-to}}\
';

var createRaw = '\
{{input type="text" id="name" value=name placeholder="Enter the name" }}\
{{input type="text" id="size" value=size placeholder="Enter the size" }}\
<button {{action "submit" this }} >Submit</button>\
';

Ember.TEMPLATES["application"] = Ember.Handlebars.compile('<div class="container"><h2>Candy Store</h2>{{outlet}}</div>');
Ember.TEMPLATES["candyList"] = Ember.Handlebars.compile(candyListRaw);
Ember.TEMPLATES["candy"] = Ember.Handlebars.compile(candyRaw);
Ember.TEMPLATES["create"] = Ember.Handlebars.compile(createRaw);

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
