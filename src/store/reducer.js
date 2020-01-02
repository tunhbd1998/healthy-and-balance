import { handleActions } from "redux-actions";
import { get, pick } from "lodash";
import {
  setCurrentLeftSidebarItem,
  resetPosts,
  fetchPostsSuccess,
  setSearchContent,
  showPostDetail,
  hidePostDetail,
  signInSuccess,
  signOutSuccess,
  alertNotification,
  fetchCategoriesSuccess,
  signInFail,
  signUpSuccess,
  signUpFail
} from "./actions";

const initStates = {
  user: null,
  authInfo: {
    status: null,
    message: null
  },
  posts: [],
  resetedPosts: true,
  currentItemId: null,
  searchContent: null,
  categories: [],
  post: null,
  notifications: []
};

export const reducer = handleActions(
  {
    [fetchCategoriesSuccess]: (state, { payload }) => ({
      ...state,
      categories: [...(get(payload, "categories") || [])]
    }),
    [setCurrentLeftSidebarItem]: (state, { payload }) => ({
      ...state,
      currentItemId: get(payload, "itemId") || null
    }),
    [resetPosts]: (state, { payload }) => ({
      ...state,
      posts: [],
      resetedPosts: true
    }),
    [fetchPostsSuccess]: (state, { payload }) => ({
      ...state,
      posts: get(payload, "posts") || [],
      resetedPosts: false
    }),
    [setSearchContent]: (state, { payload }) => ({
      ...state,
      searchContent: get(payload, "content")
    }),
    [showPostDetail]: (state, { payload }) => ({
      ...state,
      post: get(payload, "posts") || null
    }),
    [hidePostDetail]: (state, action) => ({
      ...state,
      post: null
    }),
    [signInSuccess]: (state, { payload }) => ({
      ...state,
      user: get(payload, "user") || null,
      authInfo: {
        status: true,
        message: null
      }
    }),
    [signInFail]: (state, { payload }) => ({
      ...state,
      user: null,
      authInfo: {
        status: false,
        message: get(payload, "msg")
      }
    }),
    [signUpSuccess]: (state, { payload }) => ({
      ...state,
      authInfo: {
        status: true,
        message: null
      }
    }),
    [signUpFail]: (state, { payload }) => ({
      ...state,
      authInfo: {
        status: false,
        message: get(payload, "msg")
      }
    }),
    [signOutSuccess]: (state, action) => ({
      ...state,
      user: null
    }),
    [alertNotification]: (state, { payload }) => ({
      ...state,
      notifications: [pick(payload, ["type", "message"])]
    })
  },
  initStates
);
