const nodeMailer = require("nodemailer");

const createMail = async (name, email, message, emailMedico) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Configurar el contenido del correo electrónico
  let mailMsg = {
    from: process.env.EMAIL,
    to: emailMedico,
    subject: "Correo desde la App Consumedic 👨‍⚕️",
    //text: `Hola mi nombre es ${name},\n\n Mi email para contacto es: ${email},\n\n Consulta: ${message}`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f7f7f7;
          }
          
          h1 {
            color: white;
            background-color: green ;
            padding: 10px;
          }
          
          p {
            margin-bottom: 10px;
          }
          
          .message {
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Consulta de un Paciente</h1>
          <p>Hola, mi nombre es ${name}.</p>
          <p>Mi email para contacto es: ${email}.</p>
          <p>Consulta:</p>
          <p class="message">${message}</p>
        </div>
      </body>
    </html>
  `,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailMsg, (error, info) => {
    if (error) {
      throw new Error("Error al enviar el correo electrónico");
    } else {
      throw new Error("Correo electrónico enviado: " + info.response);
    }
  });
};

module.exports = { createMail };
