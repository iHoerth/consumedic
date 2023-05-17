import React, { useState } from "react";
import { sendMail } from "./helper";

const Mail = () => {
  const [values, setValues] = useState({
    name: "",
    emailMedico: "noeliapaz676@gmail.com",
    email: "",
    message: "",
  });

  const { name, email, message, emailMedico } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("Por favor, complete todos los campos");
      return;
    } else {
      sendMail({ name, email, message, emailMedico })
        .then((data) => {
          alert(data.message);
          setValues({
            ...values,
            name: "",
            email: "",
            message: "",
          });
        })

        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escriba su nombre"
        value={name}
        onChange={handleChange("name")}
      />
      <input
        type="text"
        placeholder="Dejame tu email para comunicarme con vos "
        value={email}
        onChange={handleChange("email")}
      />
      <textarea
        placeholder="Escriba el Mensaje"
        value={message}
        onChange={handleChange("message")}
      ></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Mail;
