import { ConfigEnvironment } from './environments';

type TConfigUrl = Record<ConfigEnvironment, string>;
type TConfigUrlIdentifiers =
  | 'register'
  | 'buy'
  | 'forgotEmail'
  | 'helpdesk'
  | 'termsOfService'
  | 'privacyPolicy'
  | 'shop'
  | 'appStore'
  | 'playStore'
  | 'scanHelp'
  | 'welcomeBenefits'
  | 'personalInfo'
  | 'faq'
  | 'loginHelp'
  | 'version';

const urls: Record<TConfigUrlIdentifiers, TConfigUrl> = {
  appStore: {
    beta: 'itms-apps://apps.apple.com/be/app/uitpas/id1658556470?l=nl',
    production: 'itms-apps://apps.apple.com/be/app/uitpas/id1658556470?l=nl',
  },
  buy: {
    beta: 'https://test.uitpas.be/activiteiten-in-de-regio?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
    production:
      'https://uitpas.be/activiteiten-in-de-regio?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
  },
  faq: {
    beta: 'https://helpdesk.uitpas.be/hc/nl/categories/360002137920-Ik-heb-of-wil-een-UiTPAS?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
    production:
      'https://helpdesk.uitpas.be/hc/nl/categories/360002137920-Ik-heb-of-wil-een-UiTPAS?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
  },
  forgotEmail: {
    beta: 'https://test.uitpas.be/email-vergeten?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
    production:
      'https://uitpas.be/email-vergeten?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
  },
  helpdesk: {
    beta: 'https://helpdesk.uitpas.be/hc/nl/requests/new?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
    production:
      'https://helpdesk.uitpas.be/hc/nl/requests/new?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
  },
  loginHelp: {
    beta: 'https://helpdesk.uitpas.be/hc/nl/articles/7777132221202-Meldde-je-voorheen-aan-met-je-kaartnummer-en-pincode-?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-aanmelden',
    production:
      'https://helpdesk.uitpas.be/hc/nl/articles/7777132221202-Meldde-je-voorheen-aan-met-je-kaartnummer-en-pincode-?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-aanmelden',
  },
  personalInfo: {
    beta: 'https://test.uitpas.be/profiel/persoonlijke-gegevens?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
    production:
      'https://www.uitpas.be/profiel/persoonlijke-gegevens?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
  },
  playStore: {
    beta: 'market://details?id=com.publiq.uitpas',
    production: 'market://details?id=com.publiq.uitpas',
  },
  privacyPolicy: {
    beta: 'https://test.uitpas.be/privacybeleid?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-over-app',
    production:
      'https://www.uitpas.be/privacybeleid?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-over-app',
  },
  register: {
    beta: 'https://test.uitpas.be/uitid-registreren-stap1?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
    production:
      'https://uitpas.be/uitid-registreren-stap1?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-geen-uitpas-gevonden',
  },
  scanHelp: {
    beta: 'https://helpdesk.uitpas.be/hc/nl/articles/360010576839-Hoe-kan-ik-punten-sparen-?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-punten-sparen',
    production:
      'https://helpdesk.uitpas.be/hc/nl/articles/360010576839-Hoe-kan-ik-punten-sparen-?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-punten-sparen',
  },
  shop: {
    beta: 'https://test.uitpas.be/voordelen-zoeken?cardSystemsFilter[0]={{cardSystem}}&utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=open-shop',
    production:
      'https://uitpas.be/voordelen-zoeken?cardSystemsFilter[0]={{cardSystem}}&utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=open-shop',
  },
  termsOfService: {
    beta: 'https://test.uitpas.be/gebruiksvoorwaarden?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-over-app',
    production:
      'https://www.uitpas.be/gebruiksvoorwaarden?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-over-app',
  },
  version: {
    beta: 'https://assets-test.uitpas.be/mobile-app/versions',
    production: 'https://assets.uitpas.be/mobile-app/versions',
  },
  welcomeBenefits: {
    beta: 'https://test.uitpas.be/mijn-uitpas/voordelen?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
    production:
      'https://www.uitpas.be/mijn-uitpas/voordelen?utm_source=uitpas-app&utm_medium=uitpas-app&utm_campaign=uitpas-app&utm_content=scherm-mijn-uitpas',
  },
} as const;

export const ConfigUrl = Object.keys(urls).reduce((result, key) => {
  return {
    ...result,
    [key]: urls[key][ConfigEnvironment],
  };
}, {} as Record<TConfigUrlIdentifiers, string>);
