require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js');
const { conn } = require('./db.js');

const pagoRouter = require('./routes/pago'); //mauro


const port = PORT || 3001;

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
//mauro
server.use('/pagos', pagoRouter);


//-----------------------------

server.use('/', routes);

conn.sync({ force: true }).then(async () => {
  console.log('Database connected');
  server.listen(port, () => {
    console.log('Server raised on port ' + port);
  });
});

module.exports = server;
