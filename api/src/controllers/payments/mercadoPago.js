const {Pago, Cita}= require("../../db")
server.set('port', 3001)
server.use(cors({
    origin: '*',
}));

const {id} = req.params;
console.log(id);

// server.post(`/turno`, (req, res) => {
//     // Crea un objeto de preferencia
//     let preference = {
//         //urls donde te redirige en cada caso, pago exitoso, pendiente y fallo, x razon
//         back_urls: {
//             success: 'http://localhost:3001/success',
//             pending: 'http://localhost:3001/pending',
//             failure: 'http://localhost:3001/failure'
//         },
//         items: [
//             {
//                 id: 14,
//                 title: "Mi producto",
//                 unit_price: 100,
//                 quantity: 1,
//             },
//         ],
//         //sea cual sea el resultado te redirige a esta url, normalmente id producto
//         // notification_url: 'https://misito/server',
//     };

//     mercadopago.preferences
//         .create(preference)
//         .then(function (response) {
//             console.log(response.body);
//             res.json({
//                 global: response.body.id
//             });
//             const mercadoPago = `${response.body.init_point}`
//             // res.send(`<a href='${response.body.init_point}'>Ir a pagar</a>`)
//             // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

module.exports = { 
    createPayments
 };