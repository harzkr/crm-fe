import axios from "axios";

export const ApiResponse = (method, url, body) => {
  return new Promise((resolve, reject) => {
    const config = {};

    if(localStorage.getItem("accessToken")){
      config.headers = {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }

    if (method === "post") {
      axios
        .post(url, body, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    } else {
      axios
        .get(url, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    }
  });
};
