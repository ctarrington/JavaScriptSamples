const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 3001;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(PORT, function(){
  console.log('listening on *:'+PORT);
});

function createRow() {
  return {
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 - 180,
    temperature: Math.random() * 100 + 12
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
