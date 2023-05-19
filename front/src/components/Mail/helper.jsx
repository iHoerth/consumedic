import axios from "axios";

const URL_MAIL = process.env.URL_MAIL

export const sendMail = (data) => {
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
