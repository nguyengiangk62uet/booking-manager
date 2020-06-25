// @flow
import { regions } from 'localization';
import { languageConstants, cookieConstants } from 'constant/shared';
import cookieHelpers from 'helpers/cookie';

const { LOCALIZATION } = cookieConstants;

const getCurrentLanguage = () => {
  let language =
    cookieHelpers.getCookie(LOCALIZATION) || languageConstants.VIETNAM;

  // check if language in localstorage exist in project or not
  if (!regions[language]) language = languageConstants.VIETNAM;

  return language;
};

const changeLanguage = newLanguage => {
  cookieHelpers.setCookie(LOCALIZATION, newLanguage, 30);
  window.location.reload();
};

export default {
  getCurrentLanguage,
  changeLanguage,
};
