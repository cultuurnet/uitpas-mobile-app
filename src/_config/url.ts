import { TConfigEnvironment } from './environments';

type TConfigUrl = Record<TConfigEnvironment, string>;
type TConfigUrlIdentifiers = 'register' | 'buy' | 'forgotEmail' | 'helpdesk' | 'termsOfService' | 'privacyPolicy';

const urls: Record<TConfigUrlIdentifiers, TConfigUrl> = {
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
  privacyPolicy: {
    beta: 'https://test.uitpas.be/privacybeleid',
    production: 'https://www.uitpas.be/privacybeleid',
  },
  register: {
    beta: 'https://test.uitpas.be/uitid-registreren-stap1',
    production: 'https://uitpas.be/uitid-registreren-stap1',
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
