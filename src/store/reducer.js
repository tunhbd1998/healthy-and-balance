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
};

export const reducer = (state = initStates, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_CATEGORIES: {
      return {
        ...state,
        categories: [
          ...JSON.parse(getDataFromLocalStorage("commonCategories")),
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
    default:
      return { ...state };
  }
};
