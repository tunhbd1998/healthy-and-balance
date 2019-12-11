import * as data from "../data";
import { get } from "lodash";

export const prepareDataForApp = () => {
  saveDataToLocalStorage("preparedData", true);
  saveDataToLocalStorage(
    "commonCategories",
    JSON.stringify(data.commonCategories)
  );
  saveDataToLocalStorage("categories", JSON.stringify(data.categories));
  saveDataToLocalStorage("users", JSON.stringify(data.users));
  saveDataToLocalStorage("posts", JSON.stringify(data.posts));
};

export const saveDataToLocalStorage = (key, val) => {
  localStorage.setItem(key, val);
};

export const getDataFromLocalStorage = key => {
  const data = localStorage.getItem(key);

  return data;
};

export const getCategoryTitle = id => {
  const categories = [
    ...JSON.parse(getDataFromLocalStorage("commonCategories")),
    ...JSON.parse(getDataFromLocalStorage("categories")),
  ];

  const category = categories.filter(categ => categ.id === id)[0];

  return get(category, "title");
};

export const getCategoryById = id => {
  const categories = [
    ...JSON.parse(getDataFromLocalStorage("commonCategories")),
    ...JSON.parse(getDataFromLocalStorage("categories")),
  ];

  const category = categories.filter(categ => categ.id === id)[0];

  return category;
};

export const getUserByUsername = username => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  return get(users, username);
};

export const fetchPostsByCategory = (categoryId, page, pageSize) => {
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.category === categoryId
  );
  const totalPage = Math.ceil((posts.length * 1.0) / pageSize);

  if (totalPage < page) {
    return [];
  }

  return posts.slice((page - 1) * pageSize, page * pageSize);
};

export const fetchPostsBySearch = (text, page, pageSize) => {
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.title.indexOf(text) > -1
  );
  const totalPage = Math.ceil((posts.length * 1.0) / pageSize);

  if (totalPage < page) {
    return [];
  }

  return posts.slice((page - 1) * pageSize, page * pageSize);
};

export const updateCurrentCategory = id => {
  saveDataToLocalStorage("currentCategory", getCategoryById(id));
};

export const getCurrentCategory = id => {
  return JSON.parse(getDataFromLocalStorage("currentCategory"));
};

export const clearSensitiveChange = () => {
  localStorage.removeItem("");
};

export const isPostInUserMarks = (username, postId) => {
  const user = getUserByUsername(username);

  if (!user) {
    return false;
  }

  return user.markedPosts.findIndex(pId => pId === postId) > -1;
};

export const isPostInUserFollowings = (username, postId) => {
  const user = getUserByUsername(username);

  if (!user) {
    return false;
  }

  return user.fllowingPosts.findIndex(pId => pId === postId) > -1;
};

export const signIn = (username, password) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (users[username] && users[username].password === password) {
    return users[username];
  }

  return null;
};
