import axios from "axios";
import { ErrorResponse } from "../Models/ErrorResponse";

interface CreateUserData {
  name: string,
  email: string,
  password: string
}

interface CreateUserResponse {
  token: string,
}

export const createUser = (createUserData: CreateUserData): Promise<CreateUserResponse> => {
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/users`
  return new Promise((resolve, reject) => {
    axios.post(endpoint, createUserData)
      .then((res: { data: CreateUserResponse }) => {
        resolve(res.data);
      })
      .catch((err: { response: { data: ErrorResponse } }) => {
        reject(err.response.data);
      });
  });
}
