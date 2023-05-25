import axios from "axios";

const URL_MAIL = process.env.REACT_APP_URL_MAIL;

export const sendMail = (data) => {
  console.log(data);
  return axios
    .post(URL_MAIL, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailToPaciente = (data) => {
  console.log(data);
  return axios
    .post(`${URL_MAIL}/paciente`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailRespuesta = (data) => {
  console.log(data);
  return axios
    .post(`${URL_MAIL}/respuesta`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const sendMailDocumento = (data) => {
  console.log(data);
  return axios
    .post(`${URL_MAIL}/documento`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
