import http from "./http";

export const createChatRoom = async (data) => {
  const response = await http.post("/chat/room", data);
  return response.data;
};

export const getChatRooms = async () => {
  const response = await http.get("/chat/room");
  return response.data;
};

export const createMessage = async (data) => {
  const response = await http.post("/message", data);
  return response.data;
};

export const readMessage = async (messageId, userId) => {
  const response = await http.put(`/message/${messageId}/read/${userId}`);
  return response.data;
};

export const getMessage = async (chatRoomId) => {
  const response = await http.get(`/message/${chatRoomId}`);
  return response.data;
};
