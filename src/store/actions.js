import { createAction } from "redux-actions";
import { get } from "lodash";
import * as actionTypes from "./action-types";
import {
  getDataFromLocalStorage,
  getUserByUsername,
  saveDataToLocalStorage
} from "../utils";
import { updateCookie, deleteCookie } from "../utils/cookies";

export const fetchCategoriesSuccess = createAction(
  "FETCH_CATEGORIES_SUCCESS",
  categories => ({ categories })
);

export const fetchCategories = () => (dispatch, getState) => {
  let commonCategories =
    JSON.parse(getDataFromLocalStorage("commonCategories")) || [];
  if (!get(getState(), "user")) {
    commonCategories = commonCategories.filter(categ => !categ.requireSignIn);
  }

  dispatch(
    fetchCategoriesSuccess([
      ...commonCategories,
      ...JSON.parse(getDataFromLocalStorage("categories"))
    ])
  );
};

export const setCurrentLeftSidebarItem = createAction(
  "SET_CURRENT_LEFT_SIDEBAR_ITEM",
  itemId => ({ itemId })
);

export const resetPosts = createAction("RESET_POSTS");

export const fetchPostsSuccess = createAction("FETCH_POSTS_SUCCESS", posts => ({
  posts
}));

export const fetchPostsByCategory = categoryId => (dispatch, getState) => {
  // const { currentItemId } = getState();
  const sourcePosts = JSON.parse(getDataFromLocalStorage("posts"));
  const posts = sourcePosts.filter(post => post.category === categoryId);

  // if (currentItemId === "new") {
  //   posts = sourcePosts.sort(
  //     (dateOne, dateTwo) => new Date(dateTwo) - new Date(dateOne)
  //   );
  // } else if (currentItemId === "following") {
  //   posts = sourcePosts.filter(
  //     post => user.followingUsers.findIndex(usn => usn === post.author) > -1
  //   );
  // } else if (currentItemId === "marked") {
  //   posts = sourcePosts.filter(
  //     post => user.markedPosts.findIndex(pId => pId === post.id) > -1
  //   );
  // } else {
  //   posts =
  // }

  dispatch(fetchPostsSuccess(posts));
};

export const fetchPostsBySearchContent = content => (dispatch, getState) => {
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.title.toLowerCase().indexOf(content.toLowerCase()) > -1
  );

  dispatch(fetchPostsSuccess(posts));
};

export const fetchTodayPosts = () => dispatch => {
  const sourcePosts = JSON.parse(getDataFromLocalStorage("posts"));
  const posts = sourcePosts.sort(
    (dateOne, dateTwo) => new Date(dateTwo) - new Date(dateOne)
  );

  dispatch(fetchPostsSuccess(posts));
};

export const fetchFollowingPosts = () => (dispatch, getState) => {
  const { user } = getState();
  const sourcePosts = JSON.parse(getDataFromLocalStorage("posts"));
  const posts = sourcePosts.filter(
    post =>
      (get(user, "followingUsers") || []).findIndex(
        usn => usn === post.author
      ) > -1
  );

  dispatch(fetchPostsSuccess(posts));
};

export const fetchMarkedPosts = () => (dispatch, getState) => {
  const { user } = getState();
  const sourcePosts = JSON.parse(getDataFromLocalStorage("posts"));
  const posts = sourcePosts.filter(
    post =>
      (get(user, "markedPosts") || []).findIndex(pId => pId === post.id) > -1
  );

  dispatch(fetchPostsSuccess(posts));
};

export const setSearchContent = createAction("SET_SEARCH_CONTENT", content => ({
  content
}));

export const showPostDetail = createAction("SHOW_POST_DETAIL", post => ({
  post
}));

export const hidePostDetail = createAction("HIDE_POST_DETAIL");

export const signInSuccess = createAction("SIGN_IN_SUCCESS", user => ({
  user
}));

export const signInFail = createAction("SIGN_IN_FAIL", msg => ({ msg }));

export const signIn = (username, password) => dispatch => {
  const user = getUserByUsername(username);
  console.log("user", user, username, password);

  if (!user || password !== get(user, "password")) {
    return dispatch(signInFail("Tài khoản hoặc mật khẩu không đúng"));
  }

  updateCookie("user", JSON.stringify(user));
  dispatch(signInSuccess(user));
};

export const signOutSuccess = createAction("SIGN_OUT_SUCCESS");

export const signOut = () => dispatch => {
  deleteCookie("user");
  dispatch(signOutSuccess());
};

export const signUpSuccess = createAction("SIGN_UP_SUCCESS");

export const signUpFail = createAction("SIGN_UP_FAIL", msg => ({ msg }));

export const signUp = data => dispatch => {
  const user = { ...data };
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (users[user.username]) {
    return dispatch(
      signUpFail("Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác")
    );
  }

  users[user.username] = user;
  saveDataToLocalStorage("users", JSON.stringify(users));
  dispatch(signUpSuccess());
};

export const alertNotification = createAction(
  "ALERT_NOTIFICATION",
  (type, message) => ({
    type: actionTypes.ALERT_NOTIFICATION,
    payload: { type, message }
  })
);

export const updateUser = createAction("UPDATE_USER", user => ({ user }));
