import http from "./http";

export const addStory = async (data) => {
  const response = await http.post("/story/img", data);
  return response.data;
};

export const addReel = async (data) => {
  const response = await http.post("/story/reel", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const mergeReel = async (data) => {
  const response = await http.post("/story/reel-merge", data);
  return response.data;
};

export const fetchNextChunk = async (data) => {
  console.log("data", data);
  const response = await http.get("/story/reel", { params: data });
  return response.data;
};
