exports.index = function(req, res){
    res.render('index', { title: 'Stuff' });
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


