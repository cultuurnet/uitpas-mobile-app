import { TTrackingData, TTrackingEvents } from '../_models';

export const TrackingConfig = {
  appEnvironmentSchema: 'iglu:be.general/app_env/jsonschema/1-0-0',
  appId: 'uitpas-mobile-app',
  endpoint: 'sneeuwploeg.uitpas.be',
  isEnabled: !__DEV__,
  passHolderSchema: 'iglu:be.uitpas-mobile/passholder/jsonschema/1-0-0',
};

/**
 * These JSON schemas are defined in a centralized, online repository called iglu.
 * We refer to them so our tracker knows how the data is formatted.
 *
 * @see https://json-schema.org/
 * @see https://github.com/snowplow/iglu-central
 */
export const trackingSchemes: Record<keyof TTrackingData | keyof TTrackingEvents, string> = {
  buttonClick: 'iglu:be.general/button_click/jsonschema/1-0-0',
  reward: 'iglu:be.uitpas-mobile/reward/jsonschema/1-0-0',
} as const;
