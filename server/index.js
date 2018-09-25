const express = require('express');
const cors  = require('cors');
const morgan = require('morgan'); // used to make a log
const bodyParser = require('body-parser');
const port = process.env.PORT || 1234;
var app = express();
const messages = require('./db/messages');

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Full stack message board'
  });
});

// message route
app.get('/messages', (req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  }).catch( (error) => {
    res.status(500);
    res.json(error);
  });
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.create(req.body).then( (message) => {
    res.json(message);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
