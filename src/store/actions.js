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

export const fetchPostsByCategory = categoryId => (dispatch, getState) => {
  const { currentItem } = getState();
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.category === currentItem.id
  );

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
