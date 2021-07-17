import axios from "axios";
interface CreateUserData {
  name: string,
  email: string,
  password: string
}

export const createUser = (createUserData: CreateUserData): Promise<{ token: string }> => {
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/users`
  return new Promise((resolve, reject) => {
    axios.post(endpoint, createUserData)
      .then((res: { data: { token: string } }) => {
        resolve(res.data);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}
