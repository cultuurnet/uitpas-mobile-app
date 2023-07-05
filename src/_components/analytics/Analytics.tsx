import { useEffect } from 'react';
import { EventContext } from '@snowplow/react-native-tracker';

import { useTracking } from '../../_context';
import { TRewardContext } from '../../_models/tracking';

type TContexts = {
  reward: TRewardContext;
};

export const schemes: Record<keyof TContexts, string> = {
  reward: 'iglu:be.uitpas-mobile/reward/jsonschema/1-0-0',
} as const;

type TProps = {
  contexts?: TContexts;
  screenName?: string;
};

const Analytics = ({ screenName, contexts }: TProps) => {
  const { trackScreenViewEvent } = useTracking();

  useEffect(() => {
    if (!screenName) return;

    const mappedContexts = Object.keys(contexts || []).map(
      (key): EventContext => ({
        data: contexts[key],
        schema: schemes[key],
      }),
    );

    trackScreenViewEvent(screenName, mappedContexts);
  }, [screenName, trackScreenViewEvent, contexts]);

  return null;
};

export default Analytics;
