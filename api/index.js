require('dotenv').config();
// const { PORT } = process.env;
const { PORT, HOST, DEPLOY, DEPLOYPORT, tokenMP, MP_SUCCES, MP_PENDING, MP_FAILURE } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/index');
const { conn } = require('./src/db');

const hostFront = DEPLOY || 'localhost';
const portFront = DEPLOYPORT || ':3000';

const port = PORT || 3001;

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: ['*', 'https://apideploy-production.up.railway.app'],
  })
);


// server.use(
//   cors({
//     origin: 'https://apideploy-production.up.railway.app',
//   })
// );
// server.use(cors());
server.use(morgan('dev'));
//

server.use('/', routes);

conn.sync({ force: false }).then(async () => {
  console.log('Database connected');
  server.listen(port, HOST ? HOST : '0.0.0.0', () => {
    console.log('Server raised on port ' + port);
  });
});

server.set('port', port);

server.post('/turno', (req, res) => {
  // res.status(200).send('ok');

  const dataPreferences = req.body;
  console.log('cita: ' + dataPreferences);

  // Crea un objeto de preferencia
  let preference = {
    //urls donde te redirige en cada caso, pago exitoso, pendiente y fallo, x razon
    back_urls: {
      success: `http://${hostFront}${portFront}/turno/${dataPreferences.idDoctor}/${dataPreferences.fechaCita}/${dataPreferences.horaCita}/aprobado/${dataPreferences.comentario}`,
      // pending: `http://localhost:3000/turno/${dataPreferences.idDoctor}/${dataPreferences.fechaCita}/${dataPreferences.horaCita}/pendiente/`,
      failure: `http://${hostFront}${portFront}/turno/${dataPreferences.idDoctor}/${dataPreferences.fechaCita}/${dataPreferences.horaCita}/rechazado/0`,
    },
    items: [
      {
        id: dataPreferences.id,
        title: dataPreferences.doctorName,
        description: dataPreferences.doctorApellido,
        unit_price: dataPreferences.precioConsulta,
        quantity: 1,
      },
    ],
    //sea cual sea el resultado te redirige a esta url, normalmente id producto
    // notification_url: 'https://misito/server',

    ///agregar despues, datos del paciente
    // payer: {
    //     email: patientPreferences.patientEmail,
    //     name: patientPreferences.patientNombre,
    //     surname: patientPreferences.patientApellido
    //   },
  };

  server.use('/notificar', (req, res) => {
    console.log('notificar');
  });

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      //console.log(response.body);
      res.json({
        global: response.body.init_point,
      });
      const mercadoPago = `${response.body.init_point}`;
      // res.send(`<a href='${response.body.init_point}'>Ir a pagar</a>`)
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: tokenMP,
});

module.exports = {
  server,
  // mercadoPago
};
