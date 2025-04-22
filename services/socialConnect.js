import http from "./http";

export const createConnect = async (data) => {
  const response = await http.post("/socialConnect", data);
  return response.data;
};

export const fetchEmployers = async (data) => {
  const response = await http.get("/socialConnect", data);
  return response.data;
};