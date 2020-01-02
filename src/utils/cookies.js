import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getCookie = field => {
  return parseCookies(null)[field];
};

export const updateCookie = (field, value) => {
  setCookie(null, field, value, { path: '/' });
};

export const deleteCookie = field => {
  destroyCookie(null, field, { path: '/' });
};
