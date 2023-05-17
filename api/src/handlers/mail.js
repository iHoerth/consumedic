const { createMail } = require("../controllers/mail/createMail");

const postMail = async (req, res) => {
  try {
    const { name, email, message, emailMedico } = req.body;
    await createMail(name, email, message, emailMedico);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

module.exports = {
  postMail,
};
