import { cookieConstants } from 'constant/shared';

const { COOKIE_DOMAIN } = cookieConstants;

const setCookie = (cname, cvalue, expdays) => {
  let expires = '';
  if (expdays) {
    const d = new Date();
    d.setTime(d.getTime() + expdays * 24 * 60 * 60 * 1000);
    expires = `;expires=${d.toUTCString()}`;
  }
  document.cookie = `${cname}=${cvalue}${expires}${COOKIE_DOMAIN};path=/`;
};

const getCookie = cname => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const deleteCookie = cname => {
  document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC${COOKIE_DOMAIN};path=/`;
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
};
