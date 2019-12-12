import * as actionTypes from "./action-types";
import { getDataFromLocalStorage } from "../utils";

const initStates = {
  user: null,
  posts: [],
  resetedPosts: true,
  currentItem: null,
  searchContent: null,
  categories: null,
  post: null,
  notifications: [],
};

export const reducer = (state = initStates, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_CATEGORIES: {
      let commonCategories =
        JSON.parse(getDataFromLocalStorage("commonCategories")) || [];
      if (!state.user) {
        commonCategories = commonCategories.filter(
          categ => !categ.requireSignIn
        );
      }

      return {
        ...state,
        categories: [
          ...commonCategories,
          ...JSON.parse(getDataFromLocalStorage("categories")),
        ],
      };
    }
    case actionTypes.SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: payload.item,
      };
    }
    case actionTypes.RESET_POSTS: {
      return {
        ...state,
        posts: [],
        resetedPosts: true,
      };
    }
    case actionTypes.FETCH_POSTS_DONE: {
      return {
        ...state,
        posts: payload.posts,
        resetedPosts: false,
      };
    }
    case actionTypes.SET_SEARCH_CONTENT: {
      return {
        ...state,
        searchContent: payload.content,
      };
    }
    case actionTypes.SHOW_POST_DETAIL: {
      return {
        ...state,
        post: payload.post,
      };
    }
    case actionTypes.HIDE_POST_DETAIL: {
      return {
        ...state,
        post: null,
      };
    }
    case actionTypes.SET_USER: {
      return {
        ...state,
        user: payload.user,
      };
    }
    case actionTypes.SIGN_OUT: {
      return {
        ...state,
        user: null,
      };
    }
    case actionTypes.ALERT_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          // ...state.notifications,
          { type: payload.type, message: payload.message },
        ],
      };
    }
    default:
      return { ...state };
  }
};
