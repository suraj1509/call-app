import http from "./http";

export const updateUser = async (data) => {
  const response = await http.put("/users/me", data);
  return response.data;
};

export const updateFeedUser = async (type, userId, body) => {
    const response = await http.post(`/feedUser/${type}/${userId}`, body);
    return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get("/users/me");
  return response.data;
};

export const getSearchUsers = async (query) => {
  const response = await http.get(`/users/search?name=${encodeURIComponent(query)}`);
  return response?.data || [];
};

export const getCountries = async () => {
  const response = await http.get("https://countriesnow.space/api/v0.1/countries");
  return response?.data?.data;
};

export const getFeed = async (role) => {
  const response = await http.get(`/users/feedUsers?role=${role}`);
  return response?.data || [];
};

export const getInteractionUserData = async (interactionType) => {
  const url = interactionType;
  const response = await http.get(url);
  return response?.data;
};

export const deleteCurrentUser = async (id) => {
  const response = await http.delete(`/users/${id}`);
  return response?.data;
};

export default {
  updateUser,
  getCurrentUser,
  getFeed,
  getCountries,
  getSearchUsers,
  getInteractionUserData,
};
