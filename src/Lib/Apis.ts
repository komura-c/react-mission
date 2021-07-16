import axios from "axios";

export const createUser = (name: string, email: string, password: string) => {
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/users`
  const postData = {
    name: "string",
    email: "string",
    password: "string"
  }
  return new Promise((resolve, reject) => {
    axios.post(endpoint, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
