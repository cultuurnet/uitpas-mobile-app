import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { EventContext as EventTrackingData } from '@snowplow/react-native-tracker';

import { useTracking } from '../../_context';
import { TRewardTrackingData } from '../../_models/tracking';

type TTrackingData = {
  reward: TRewardTrackingData;
};

/**
 * These JSON schemas are defined in a centralized, online repository called iglu.
 * We refer to them so our tracker knows how the data is formatted.
 *
 * @see https://json-schema.org/
 * @see https://github.com/snowplow/iglu-central
 */
export const schemes: Record<keyof TTrackingData, string> = {
  reward: 'iglu:be.uitpas-mobile/reward/jsonschema/1-0-0',
} as const;

type TProps = {
  data?: TTrackingData;
  screenName?: string;
};

const Analytics = ({ screenName, data }: TProps) => {
  const { trackScreenViewEvent } = useTracking();

  useFocusEffect(
    useCallback(() => {
      if (!screenName) return;

      const mappedData = Object.keys(data || []).map(
        (key): EventTrackingData => ({
          data: data[key],
          schema: schemes[key],
        }),
      );

      trackScreenViewEvent(screenName, mappedData);
    }, [screenName, trackScreenViewEvent, data]),
  );

  return null;
};

export default Analytics;
