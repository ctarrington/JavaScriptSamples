exports.index = function(req, res){
    res.render('index', { title: 'Stuff' });
};

exports.bindings = function(req, res){
    res.render('bindings', { title: 'Bindings' });
};

exports.personDirective = function(req, res){
    res.render('personDirective', { title: 'Person Directive' });
};

exports.loadIt = function(req, res){
    res.render('loadIt', { title: 'Load It Up' });
};


