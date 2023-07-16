import axios from "axios";

const createInterceptors = () => {
  axios.interceptors.request.use((request) => {
    if (localStorage.getItem("token")) {
      request.headers = {
        ...(request.headers as any),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    }
    return request;
  });
};

export default createInterceptors;

