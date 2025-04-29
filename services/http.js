// import store from 'store';
import axios from "axios";
import qs from "qs";
import auth from "@react-native-firebase/auth";
// import store from '../redux/store';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {message} from 'antd';
// import {firebaseAuth} from '../config/firebase';
// import { isEnvDev } from "../../config"
// isEnvDev ? process.env.REACT_APP_API_BASE_URL_LOCAL : process.env.REACT_APP_API_BASE_URL
const apiBaseUrl = "https://0277-2409-40c2-204e-bf80-5df8-3b99-95f3-b041.ngrok-free.app";

const http = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
  timeout: 30 * 1000,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = await auth()?.currentUser?.getIdToken(true);
    if (!!token && !config.noAuth) {
      config.headers.Authorization = token;

      // config.headers["Provider"] = "EMAIL_PASSWORD" //store.get('authProvider');
    }

    if (!(config.method === "get" || config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    // if (config.url === "/auth/me") {
    //     config.headers["FCMToken"] = await AsyncStorage.getItem("fcmToken")
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  async (response) => {
    // const messages = await store.getState().messages;
    // if (response.data.messageCode && messages[response.data.messageCode]) {
    //     response.data.message = messages[response.data.messageCode]
    // } else {
    //     response.data.message = "Success"
    // }

    return response;
  },
  async (error) => {
    // const messages = await store.getState().messages

    // const expectedError = error.response && error.response.status >= 400 && error.response.status < 500

    // if (expectedError) {
    //     if (error.response.status === 401) {
    //         const originalRequest = error.response.config
    //         originalRequest._retry = true
    //         let newToken = await auth().currentUser.getIdToken(true)
    //         store.set('authToken', newToken);
    //         originalRequest.headers["Authorization"] = "Bearer " + newToken
    //         return http(originalRequest)
    //     } else {
    //         message.error(error.response.data?.error);
    //     }

    //     const response = error.response
    //     if (response.data.messageCode && messages[response.data.messageCode]) {
    //         response.data.message = messages[response.data.messageCode]
    //     } else {
    //         response.data.message = "Error"
    //     }

    //     return response
    // } else {
    //     message.error(error.response.data?.error);
    // }
    return Promise.reject(error);
  },
);

export default http;
