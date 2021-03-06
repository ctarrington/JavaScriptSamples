
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    sio = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/bindings', routes.bindings);
app.get('/chatter', routes.chatter);
app.get('/personDirective', routes.personDirective);
app.get('/loadIt', routes.loadIt);
app.get('/treePeople', routes.treePeople);
app.get('/cars', routes.cars);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var currentData = {
    messages: []
};

var io = sio.listen(server);
io.sockets.on('connection', function(socket) {
    for (var ctr=0; ctr < currentData.messages.length; ctr++)
    {
        socket.emit('update', currentData.messages[ctr]);
    }

    socket.on('send', function(data) {
        currentData.messages.push(data);
        socket.broadcast.emit('update', data);
    });
});