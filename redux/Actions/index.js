import * as TYPES from "../Constants";
import * as services from "../../services/user";
import * as chatServices from "../../services/chats";
import { ToastAndroid } from "react-native";

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: TYPES?.FETCH_CURRENT_USER });
  try {
    const data = await services?.getCurrentUser();
    dispatch({
      type: TYPES?.FETCH_CURRENT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPES?.FETCH_CURRENT_USER_FAILURE,
      error: "Failed to fetch Current user",
    });
  }
};

export const fetchFeedUsers = (role) => async (dispatch) => {
  dispatch({ type: TYPES?.FETCH_FEED_USERS });
  try {
    const data = await services?.getFeed(role);
    dispatch({
      type: TYPES?.FETCH_FEED_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPES?.FETCH_FEED_USERS_FAILURE,
      error: "Failed to fetch feed users",
    });
  }
};

// export const fetchFeed2Users = (genderPreference, age, isSwiping) => async (dispatch) => {
//   dispatch({ type: TYPES?.FETCH_FEED2_USERS });
//   try {
//     const data = await services?.getUsers(genderPreference, age, isSwiping);
//     dispatch({
//       type: TYPES?.FETCH_FEED2_USERS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: TYPES?.FETCH_FEED2_USERS_FAILURE,
//       error: "Failed to fetch feed users",
//     });
//   }
// };

export const updateCurrentUser = (data) => async (dispatch) => {
  dispatch({ type: TYPES?.UPDATE_CURRENT_USER });
  try {
    const updatedData = await services?.updateUser(data);
    dispatch({
      type: TYPES?.UPDATE_CURRENT_USER_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: TYPES?.UPDATE_CURRENT_USER_FAILURE,
      error: "Failed to update current user",
    });
  }
};

export const updateFeedUserInfo = (data) => async (dispatch) => {
  const { userId, type, ...filteredBody } = data.body;
  dispatch({ type: TYPES?.UPDATE_FEED_USER, payload: data });
  try {
    await services?.updateFeedUser(data.type, data.userId, filteredBody);
    const updatedData = await services?.getCurrentUser();
    dispatch({
      type: TYPES?.FETCH_CURRENT_USER_SUCCESS,
      payload: updatedData,
    });
    dispatch({
      type: TYPES?.UPDATE_FEED_USER_SUCCESS,
      payload: data,
    });
    return { success: true, message: "User feed updated successfully" };
  } catch (error) {
    dispatch({
      type: TYPES?.UPDATE_FEED_USER_FAILURE,
      payload: data,
    });
    return { success: false, message: "User update failed" };
  }
};

// export const fetchFeedChatRooms = () => async (dispatch) => {
//   dispatch({ type: TYPES?.FETCH_FEED_CHAT_ROOMS });
//   try {
//     const data = await chatServices?.getChatRooms();
//     dispatch({
//       type: TYPES?.FETCH_FEED_CHAT_ROOMS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: TYPES?.FETCH_FEED_CHAT_ROOMS_FAILURE,
//       error: "Failed to fetch user chat rooms",
//     });
//   }
// };

// export const updateCurrentUserState = (userData) => {
//   return {
//     type: TYPES.UPDATE_USER_STATE,
//     payload: userData,
//   };
// };
