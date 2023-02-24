// Please set names in english
// Find icon names in: https://fontawesome.com/search?o=r&m=free
// Find flags in: https://flagicons.lipis.dev/
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import {
  faCode,
  faGears,
  faLayerGroup,
  faLock,
  faMicrochip,
  faTasks,
  faTelevision,
  faUsers,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import gb from './locales/gb';
import pt from './locales/pt';
import bkImage from '../public/software-pic-1.jpg';

const appConfig = {
  // Available html anchors: #page-start #screenshots, #features
  mainButtonTarget: '#screenshots',
  backgroundImage: bkImage,
  defaultLanguage: {
    id: 'pt',
    name: 'Portuguese',
    flagPath: '/locales/pt.svg',
    translationFile: pt,
  },
  easyTranslationLoader: true, // If this is enabled, it will add the languages to the i18init() function in _app.js for you
  languages: [
    // Don't forget to add a translation for each new language, with the same variable name as the nome in the key "name"
    {
      id: 'pt',
      name: 'Portuguese',
      flagPath: '/locales/pt.svg',
      translationFile: pt,
    },
    {
      id: 'gb',
      name: 'English',
      flagPath: '/locales/gb.svg',
      translationFile: gb,
    },
  ],
  userAccess: true, // Allow common users to register and login
  usersOptionsMenu: [
    { name: 'Login', route: '/login' },
    { name: 'Register', route: '/login' },
  ],
  pages: [
    {
      name: 'Home',
      route: '#page-start',
    },
    {
      name: 'FeaturesTab',
      route: '#features',
    },
    {
      name: 'Printscreens',
      route: '#screenshots',
    },
  ],
  features: [
    {
      name: 'feature1',
      desc: 'feature1desc',
      icon: faLock,
    },
    {
      name: 'feature2',
      desc: 'feature2desc',
      icon: faMicrochip,
    },
    {
      name: 'feature3',
      desc: 'feature3desc',
      icon: faTelevision,
    },
    {
      name: 'feature4',
      desc: 'feature4desc',
      icon: faGears,
    },
    {
      name: 'feature5',
      desc: 'feature5desc',
      icon: faTasks,
    },
    {
      name: 'feature6',
      desc: 'feature6desc',
      icon: faWifi,
    },
    {
      name: 'feature7',
      desc: 'feature7desc',
      icon: faUsers,
    },
    {
      name: 'feature8',
      desc: 'feature8desc',
      icon: faCode,
    },
    {
      name: 'feature9',
      desc: 'feature9desc',
      icon: faLayerGroup,
    },
  ],
  // Give preference to dark pictures as a contrast to the white section before the carousel
  screenshots: [
    {
      title: 'ScreenshotTitle1',
      desc: 'ScreenshotDesc1',
      imgPath: '/web1.jpg',
    },
    {
      title: 'ScreenshotTitle2',
      desc: 'ScreenshotDesc2',
      imgPath: '/web2.jpg',
    },
    {
      title: 'ScreenshotTitle3',
      desc: 'ScreenshotDesc3',
      imgPath: '/web3.jpg',
    },
    {
      title: 'ScreenshotTitle4',
      desc: 'ScreenshotDesc4',
      imgPath: '/web4.jpg',
    },
  ],
};

export default appConfig;
