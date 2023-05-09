require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js');
const { conn } = require('./db.js');

const pagoRouter = require('./routes/pago'); //mauro
const opinionRouter = require('./routes/opinions.js'); //mauro
const newUserRouter = require('./routes/newUser.js'); //mauro

const doctorsRouter = require('./routes/doctors.js') //facu


const port = PORT || 3001;

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
//mauro
server.use('/pagos', pagoRouter);
server.use('/opinions', opinionRouter);
server.use('/newUser', newUserRouter);
server.use('/doctors', doctorsRouter)

server.use('/', routes);

conn.sync({ force: true }).then(async () => {
  console.log('Database connected');
  server.listen(port, () => {
    console.log('Server raised on port ' + port);
  });
});

module.exports = server;
