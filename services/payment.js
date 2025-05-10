import http from "./http";

export const createOrder = async (data) => {
  const response = await http.post("/payment/create-order", data);
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await http.post("/payment/verify-payment", data);
  return response.data;
};