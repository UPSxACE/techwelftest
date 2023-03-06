import appConfig from '@/app-config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';

let resources_array = {};
if (appConfig.easyTranslationLoader) {
  Object.keys(appConfig.languages).map((language) => {
    const id = appConfig.languages[language].id;
    const resource = {};
    resource[id] = {
      translation: appConfig.languages[language].translationFile,
    };
    resources_array = { ...resources_array, ...resource };
  });
}

i18n

  //.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: { order: ['path'], lookupFromPathIndex: 0 },
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      // WARNING: If you will edit the resources array manually, PLEASE disable "easyTranslationLoader", in case it's enabled in app-config.js
      ...resources_array, // WARNNING: Do NOT delete this, even if you won't use it
    },
    // lng: appConfig.defaultLanguage.id, // if you're using a language detector, do not define the lng option
    fallbackLng: appConfig.defaultLanguage.id,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
