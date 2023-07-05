import { TTrackingContexts, TTrackingEvents } from '../_models';

export const TrackingConfig = {
  appEnvironmentSchema: 'iglu:be.general/app_env/jsonschema/1-0-0',
  appId: 'uitpas-mobile-app',
  endpoint: 'sneeuwploeg.uitpas.be',
  isEnabled: true,
  passHolderSchema: 'iglu:be.uitpas-mobile/passholder/jsonschema/1-0-0',
};

export const trackingSchemes: Record<keyof TTrackingContexts | keyof TTrackingEvents, string> = {
  buttonClick: 'iglu:be.general/button_click/jsonschema/1-0-0',
  reward: 'iglu:be.uitpas-mobile/reward/jsonschema/1-0-0',
} as const;
