require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js');
const { conn } = require('./db.js');

const port = PORT || 3001;

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/', routes);

conn.sync({ force: true }).then(async () => {
  console.log('Database connected');
  server.listen(PORT, () => {
    console.log('Server raised on port ' + port);
  });
});

module.exports = server;
