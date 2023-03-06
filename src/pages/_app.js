import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'normalize.css/normalize.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeConfig from '@/theme-config';
import { initReactI18next, useTranslation } from 'react-i18next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import LanguageContext from '@/contexts/language-context';
import appConfig from '@/app-config';
import { useEffect, useState } from 'react';
import authenticationContext from '@/contexts/authentication-context';
import LanguageDetector from 'i18next-browser-languagedetector';

// import i18n (needs to be bundled ;))
import '../i18n';
import { useRouter } from 'next/router';

const AuthContext = authenticationContext;

config.autoAddCss = false;

const theme = createTheme(themeConfig);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [currentLanguage, _setLanguage] = useState(
    appConfig.languages[router.locale]
  );

  const [auth, setAuth] = useState({
    authToken: null,
    authenticated: null,
    role: null, // admin, guest...?
    //setXYZ: (XYZ) => {},
  });

  const { i18n } = useTranslation();

  /*
  useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, []);
  */

  function setLanguage(language_id) {
    i18n.changeLanguage(language_id, (err, t) => {
      if (err) return console.log('Something went wrong loading', err);
      t('key'); // -> same as i18next.t
    });

    const newLanguage = appConfig.languages[language_id];
    if (newLanguage) {
      _setLanguage(newLanguage);
    }
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}
