import * as actionTypes from "./action-types";
import { getDataFromLocalStorage } from "../utils";

export const fetchCategories = () => ({
  type: actionTypes.FETCH_CATEGORIES,
  payload: {},
});

export const setCurrentItem = item => ({
  type: actionTypes.SET_CURRENT_ITEM,
  payload: { item },
});

export const resetPosts = () => ({
  type: actionTypes.RESET_POSTS,
  payload: {},
});

export const fetchPostsDone = posts => ({
  type: actionTypes.FETCH_POSTS_DONE,
  payload: { posts },
});

export const fetchPostsByCategory = () => (dispatch, getState) => {
  const { currentItem, user } = getState();
  const sourcePosts = JSON.parse(getDataFromLocalStorage("posts"));
  let posts = [];

  if (currentItem.id === "new") {
    posts = sourcePosts.sort(
      (dateOne, dateTwo) => new Date(dateTwo) - new Date(dateOne)
    );
  } else if (currentItem.id === "following") {
    posts = sourcePosts.filter(post =>
      user.followingPosts.findIndex(pId => pId === post.id)
    );
  } else if (currentItem.id === "mark") {
    posts = sourcePosts.filter(post =>
      user.markedPosts.findIndex(pId => pId === post.id)
    );
  } else {
    posts = sourcePosts.filter(post => post.category === currentItem.id);
  }

  dispatch(fetchPostsDone(posts));
};

export const fetchPostsBySearchContent = () => (dispatch, getState) => {
  const { searchContent } = getState();
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.title.indexOf(searchContent) > -1
  );

  dispatch(fetchPostsDone(posts));
};

export const setSearchContent = content => ({
  type: actionTypes.SET_SEARCH_CONTENT,
  payload: { content },
});

export const showPostDetail = post => ({
  type: actionTypes.SHOW_POST_DETAIL,
  payload: { post },
});

export const hidePostDetail = () => ({
  type: actionTypes.HIDE_POST_DETAIL,
  payload: {},
});

export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: { user },
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
  payload: {},
});
