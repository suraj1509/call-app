import * as TYPES from "../Constants";

const initialState = {
  currentUser: {},
  loading: false,
  error: null,
  feedUsers: [],
  feedUsers2: [],
  feedUser: {},
  chatUsers: [],
  chatProfiles: [],
};

export const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES?.FETCH_CURRENT_USER:
      return { ...state, loading: true, error: null };
    case TYPES?.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload, chatUsers: action.payload?.matchedUsers || [] };
    case TYPES?.FETCH_CURRENT_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case TYPES?.FETCH_FEED_CHAT_ROOMS:
      return { ...state, loading: true, error: null };
    case TYPES?.FETCH_FEED_CHAT_ROOMS_SUCCESS:
      return { ...state, loading: false, chatProfiles: action.payload || [] };
    case TYPES?.FETCH_FEED_CHAT_ROOMS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case TYPES?.FETCH_FEED_USERS:
      return { ...state, loading: true, error: null, fetchFeedLoader: true };
    case TYPES?.FETCH_FEED_USERS_SUCCESS:
      return { ...state, loading: false, feedUsers: action.payload, fetchFeedLoader: false };
    case TYPES?.FETCH_FEED_USERS_FAILURE:
      return { ...state, loading: false, error: action.error, fetchFeedLoader: false };
    case TYPES?.FETCH_FEED2_USERS_SUCCESS:
      return { ...state, loading: false, feedUsers2: action.payload };
    case TYPES?.UPDATE_FEED_USER:
      return {
        ...state,
        feedUser: {
          ...state.feedUser,
          [action.payload.userId]: {
            ...(state?.feedUser?.[action.payload.userId] ? state.feedUser[action.payload.userId] : {}),
            [action.payload.type]: false,
          },
        },
      };

    case TYPES?.UPDATE_FEED_USER_SUCCESS:
      return {
        ...state,
        feedUser: {
          ...state.feedUser,
          [action.payload.userId]: {
            ...(state?.feedUser?.[action.payload.userId] ? state.feedUser[action.payload.userId] : {}),
            [action.payload.type]: true,
          },
        },
      };

    case TYPES?.UPDATE_FEED_USER_FAILURE:
      return {
        ...state,
        feedUser: {
          ...state.feedUser,
          [action.payload.userId]: {
            ...(state?.feedUser?.[action.payload.userId] ? state.feedUser[action.payload.userId] : {}),
            [action.payload.type]: false,
          },
        },
      };
    case TYPES?.UPDATE_CURRENT_USER:
      return { ...state, loading: true, error: null };
    case TYPES?.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
          preferences: {
            ...state.currentUser.preferences,
            ...action.payload.preferences,
          },
        },
      };
    case TYPES?.UPDATE_CURRENT_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case TYPES?.UPDATE_USER_STATE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
          preferences: {
            ...state.currentUser.preferences,
            ...action.payload.preferences,
          },
        },
      };
    default:
      return state;
  }
};
