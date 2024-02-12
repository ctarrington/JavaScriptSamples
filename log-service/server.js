const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.post('/write', function(req, res) {
  const text = req.body.text;
  console.log('text', text);

  fs.writeFile('output.txt', text+'\n', function(err) {
    if (err) {
      res.send('Error');
    } else {
      res.send('OK');
    }
  });
});

const port = 3000;
app.listen(port);
console.log('Listening on port ', port);