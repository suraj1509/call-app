// services/verificationApi.js
import http from "./http";

/**
 * Notify backend about OTP request.
 * @param {object} data - The mobile number for which OTP was requested.
 * @returns {Promise} Axios response.
 */
// export const sendOtp = async data => {
//   const response = await http.post(`/auth/send-otp`, data);
//   return response?.data;
// };

/**
 * Notify backend about OTP verification success.
 * @param {object} data - The verified mobile number.
 * @returns {Promise} Axios response.
 */
const verifyToken = async (data) => {
  const response = await http.post(`/auth/verify`, data);
  return response.data;
};

export const loginWithPhoneNumber = async (fullPhoneNumber) => {
  const response = await http.post("/auth/login/phone-number", {
    fullPhoneNumber,
  });
  return response.data;
};

export const loginWithGoogle = async (data) => {
  const response = await http.post("/auth/login/google", data);
  return response.data;
};

// export const loginWithFacebook = async (data) => {
//   const response = await http.post("/auth/login/facebook", data);
//   return response.data;
// };

export default {
  verifyToken,
};
