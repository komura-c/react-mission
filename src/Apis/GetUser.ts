import axios from "axios";

interface GetUserResponse {
  name: string,
}

export const getUser = (token: string): Promise<GetUserResponse> => {
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/users`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(endpoint, config)
      .then((res: { data: GetUserResponse }) => {
        resolve(res.data);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}
