import axios from "axios";

const ApiOne = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiOne.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { access_token } = JSON.parse(token);

      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ApiOne.interceptors.response.use(
  (response) => {
    const successCode = "200";
    const { statusCode } = response.data;
    if (statusCode) {
      if (successCode.includes(statusCode)) {
        return response;
      }

      return Promise.reject(response.data);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error.response.data ?? error);
  }
);

export default ApiOne;
