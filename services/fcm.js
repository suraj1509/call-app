import { getMessaging } from "@react-native-firebase/messaging";
import http from "./http";

export const createFcmMessage = async (data) => {
  try {
    const token = await getMessaging().getToken();
    const newData = { ...data, fcmToken: token };
    await http.post("/fcm", newData);
    return;
  } catch (error) {
    console.log("error", error.message);
  }
};
