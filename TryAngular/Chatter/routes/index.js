exports.index = function(req, res){
    res.render('index', { title: 'Stuff' });
};

exports.bindings = function(req, res){
    res.render('bindings', { title: 'Bindings' });
};

exports.chatter = function(req, res){
    res.render('chatter', { title: 'Chatter' });
};

exports.personDirective = function(req, res){
    res.render('personDirective', { title: 'Person Directive' });
};

exports.loadIt = function(req, res){
    res.render('loadIt', { title: 'Load It Up' });
};

exports.treePeople = function(req, res){
    res.render('treePeople', { title: 'Tree People' });
};

exports.cars = function(req, res){
    res.render('cars', { title: 'Cars' });
};