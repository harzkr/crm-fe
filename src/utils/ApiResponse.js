import axios from "axios";

export const ApiResponse = (method, url, body) => {
  return new Promise((resolve, reject) => {
    if (method === "post") {
      axios
        .post(url, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    } else {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    }
  });
};
