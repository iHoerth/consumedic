import axios from "axios";

export const sendMail = (data) => {
  return axios
    .post("http://localhost:3001/mail", data, {
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
