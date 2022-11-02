import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import i18n, { t, use } from 'i18next';

import NL from './locales/nl.json';

enum Language {
  Dutch = 'nl',
}

export function labelForLocale(locale: Language): string {
  switch (locale) {
    case Language.Dutch:
      return t('SHARED.LOCALE.NL');
    default:
      return null;
  }
}

use(initReactI18next).init({
  compatibilityJSON: 'v3', // By default React Native projects does not support Intl
  fallbackLng: 'en',
  lng: getLocales()[0].languageCode,
  resources: {
    nl: { translation: NL },
  },
});

export default i18n;
