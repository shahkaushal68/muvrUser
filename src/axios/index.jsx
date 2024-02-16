import axios from "axios";
import { appConfig } from "../config";
import { getEncryptedString } from "../services";

const axiosApi = axios.create({
  baseURL: appConfig.API_URL,
});

const setAuthHeader = (token) => {
  axiosApi.defaults.headers.Authorization =
    token || `Bearer ${localStorage.getItem("_token")}`;
  axiosApi.defaults.headers.requestToken = getEncryptedString(
    appConfig?.ENCRYPTION_MESSAGE
  );
  axiosApi.defaults.headers.deviceName = appConfig?.DEVICE_TYPE;
};

axiosApi.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem("_token")}`,
  requestToken: getEncryptedString(appConfig?.ENCRYPTION_MESSAGE),
  deviceName: appConfig?.DEVICE_TYPE,
};

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 404) {
      console.log("/404");
    } else if (error?.response?.status === 500) {
      console.log("/500");
    } else if (error?.response?.status === 403) {
      console.log("/403");
      localStorage?.removeItem("_token");
    } else if (error?.response?.status === 401) {
      console.log("/401");
      localStorage?.removeItem("_token");
    } else {
      console.log("/other-errors.");
    }
    return Promise.reject(error);
  }
);

export { axiosApi, setAuthHeader };
