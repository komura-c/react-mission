import axios from "axios";
import { ErrorResponse } from "../Models/ErrorResponse";

interface LoginUserData {
  email: string,
  password: string
}

interface LoginUserResponse {
  token: string,
}

export const loginUser = (loginUserData: LoginUserData): Promise<LoginUserResponse> => {
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/signin`
  return new Promise((resolve, reject) => {
    axios.post(endpoint, loginUserData)
      .then((res: { data: LoginUserResponse }) => {
        resolve(res.data);
      })
      .catch((err: { response: { data: ErrorResponse } }) => {
        reject(err.response.data);
      });
  });
}
