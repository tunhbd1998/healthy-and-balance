import * as data from "../data";

export const prepareDataForApp = () => {
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
