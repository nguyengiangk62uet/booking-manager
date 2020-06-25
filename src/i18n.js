import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages } from 'localization';
import { languageConstants } from 'constant/shared';
import localizationHelper from './helpers/localization';

i18n
  // need to testing can useTranslate function
  .use(initReactI18next)
  // initial translate object
  .init({
    // init with resources
    resources: languages,
    lng: localizationHelper.getCurrentLanguage(),
    fallbackLng: languageConstants.VIETNAM,
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

export default i18n;
