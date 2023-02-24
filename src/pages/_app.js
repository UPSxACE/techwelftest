import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'normalize.css/normalize.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeConfig from '@/theme-config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import LanguageContext from '@/contexts/language-context';
import appConfig from '@/app-config';
import i18next from 'i18next';
import { useState } from 'react';
config.autoAddCss = false;

const theme = createTheme(themeConfig);
init_i18();

export default function App({ Component, pageProps }) {
  const [currentLanguage, _setLanguage] = useState(appConfig.defaultLanguage);

  function setLanguage(language_id) {
    i18next.changeLanguage(language_id, (err, t) => {
      if (err) return console.log('Something went wrong loading', err);
      t('key'); // -> same as i18next.t
    });

    const newLanguage = appConfig.languages.find(
      (language) => language.id === language_id
    );
    if (newLanguage) {
      _setLanguage(newLanguage);
    }
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

// Functions
function init_i18() {
  let resources_array = {};
  if (appConfig.easyTranslationLoader) {
    appConfig.languages.map((language) => {
      const id = language.id;
      const resource = {};
      resource[id] = { translation: language.translationFile };
      resources_array = { ...resources_array, ...resource };
    });
  }

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        // WARNING: If you will edit the resources array manually, PLEASE disable "easyTranslationLoader", in case it's enabled in app-config.js
        ...resources_array, // WARNNING: Do NOT delete this, even if you won't use it
      },
      lng: appConfig.defaultLanguage.id, // if you're using a language detector, do not define the lng option
      fallbackLng: appConfig.defaultLanguage.id,

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
}
