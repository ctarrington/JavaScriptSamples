var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

function createRow() {
  return {
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 -180,
    temperature: Math.random() * 120 - 20
  };
}

function createRows() {
  const rows = [];
  for (let ctr=0; ctr < 10000; ctr++) {
    rows.push(createRow());
  }

  return rows;
}

function transpose(rows) {
  const lattitudes = rows.map(row=>row.latitude);
  const longitudes = rows.map(row=>row.longitude);
  const temperatures = rows.map(row=>row.temperature);

  return {lattitudes, longitudes, temperatures};
}

setInterval(() => {
  const rows =
  // io.emit('data', transpose(createRows()));
  io.emit('data', createRows());
}, 1000);
