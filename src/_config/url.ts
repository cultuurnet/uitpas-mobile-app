import { TConfigEnvironment } from './environments';

type TConfigUrl = Record<TConfigEnvironment, string>;
type TConfigUrlIdentifiers =
  | 'register'
  | 'buy'
  | 'forgotEmail'
  | 'helpdesk'
  | 'termsOfService'
  | 'privacyPolicy'
  | 'shop'
  | 'appStore'
  | 'playStore';

const urls: Record<TConfigUrlIdentifiers, TConfigUrl> = {
  appStore: {
    beta: 'itms-apps://apps.apple.com/be/app/uitpas/id1249270326?l=nl',
    production: 'itms-apps://apps.apple.com/be/app/uitpas/id1249270326?l=nl',
  },
  buy: {
    beta: 'https://test.uitpas.be/activiteiten-in-de-regio',
    production: 'https://uitpas.be/activiteiten-in-de-regio',
  },
  forgotEmail: {
    beta: 'https://test.uitpas.be/email-vergeten',
    production: 'https://uitpas.be/email-vergeten',
  },
  helpdesk: {
    beta: 'https://helpdesk.uitpas.be/hc/nl/requests/new',
    production: 'https://helpdesk.uitpas.be/hc/nl/requests/new',
  },
  playStore: {
    beta: 'market://details?id=be.cultuurnet.uitpasapp',
    production: 'market://details?id=be.cultuurnet.uitpasapp',
  },
  privacyPolicy: {
    beta: 'https://test.uitpas.be/privacybeleid',
    production: 'https://www.uitpas.be/privacybeleid',
  },
  register: {
    beta: 'https://test.uitpas.be/uitid-registreren-stap1',
    production: 'https://uitpas.be/uitid-registreren-stap1',
  },
  shop: {
    beta: 'https://test.uitpas.be/voordelen-zoeken?cardSystemsFilter[0]={{cardSystem}}&utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=open-shop',
    production:
      'https://test.uitpas.be/voordelen-zoeken?cardSystemsFilter[0]={{cardSystem}}&utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=open-shop',
  },
  termsOfService: {
    beta: 'https://test.uitpas.be/gebruiksvoorwaarden',
    production: 'https://www.uitpas.be/gebruiksvoorwaarden',
  },
} as const;

export const ConfigUrl = Object.keys(urls).reduce((result, key) => {
  return {
    ...result,
    [key]: urls[key][TConfigEnvironment],
  };
}, {} as Record<TConfigUrlIdentifiers, string>);
