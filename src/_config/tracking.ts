import { Config } from './env';

import { TTrackingData, TTrackingEvents } from '../_models';

export const TrackingConfig = {
  appEnvironmentSchema: 'iglu:be.general/app_env/jsonschema/1-0-0',
  appId: 'uitpas-mobile-app',
  endpoint: Config.TRACKING_HOST,
  familySchema: 'iglu:be.uitpas-mobile/family/jsonschema/1-0-0',
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
  errorMessage: 'iglu:be.general/error_message/jsonschema/1-0-0',
  linkClick: 'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
  reward: 'iglu:be.uitpas-mobile/reward/jsonschema/1-0-1',
  successMessage: 'iglu:be.general/success_message/jsonschema/1-0-0',
  swimlaneInteraction: 'iglu:be.general/swimlane_interaction/jsonschema/1-0-1',
  up_action: 'iglu:be.uitpas-mobile/up-action/jsonschema/1-0-0',
} as const;
