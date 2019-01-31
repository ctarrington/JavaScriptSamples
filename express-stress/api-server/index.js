const express = require('express');
const app = express();

const rawPort = process.argv[2] || '3000';
const port = parseInt(rawPort, 10);

const populate = (count) => {
  const numbers = [];
  for (let ctr=0; ctr<count;ctr++) {
    numbers.push(Math.random());
  }

  return numbers;
};

app.get('/', function (req, res) {
  res.send('Usage: GET /numbers/3');
});

app.get('/numbers/:count', function (req, res) {
  const count = req.params.count || 10;
  res.send(populate(count));
});

app.listen(port);
console.log('listening on port', port);
