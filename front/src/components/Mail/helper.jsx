import axios from "axios";

import {URL_MAIL} from '../../helpers/urlVariables'

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
