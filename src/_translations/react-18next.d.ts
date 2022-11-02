import NL from './locales/nl.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'nl';
    resources: {
      nl: typeof NL;
    };
  }
}
