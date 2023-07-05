import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { createTracker, EventContext } from '@snowplow/react-native-tracker';

import { TrackingConfig, trackingSchemes } from '../_config';
import { ConfigEnvironment } from '../_config/environments';
import { TTrackingContexts, TTrackingEvents } from '../_models';
import { log } from '../_utils/logger';
import { useGetMe } from '../profile/_queries/useGetMe';
import { useAuthentication } from './AuthenticationContext';

type TTrackingContext = {
  trackScreenViewEvent: (name: string, contexts?: TTrackingContexts) => Promise<void>;
  trackSelfDescribingEvent: <T extends keyof TTrackingEvents>(type: T, data: TTrackingEvents[T]) => Promise<void>;
};

const TrackingContext = createContext<TTrackingContext>(null);

export const useTracking = () => useContext(TrackingContext);

const TrackingProvider = ({ children }) => {
  const { user } = useAuthentication();
  const { data, isFetched } = useGetMe();

  const globalContexts: EventContext[] = useMemo(
    () => [
      {
        data: {
          environment: ConfigEnvironment,
        },
        schema: TrackingConfig.appEnvironmentSchema,
      },
      ...(isFetched && data?.id
        ? [
            {
              data: {
                id: data?.id,
              },
              schema: TrackingConfig.passHolderSchema,
            },
          ]
        : []),
    ],
    [isFetched, data?.id],
  );

  const tracker = useMemo(() => {
    if (!TrackingConfig.isEnabled) return;

    return createTracker(
      TrackingConfig.appId,
      {
        endpoint: TrackingConfig.endpoint,
      },
      {
        trackerConfig: {
          appId: TrackingConfig.appId,
          applicationContext: true,
          installAutotracking: true,
          lifecycleAutotracking: true,
          platformContext: true,
          sessionContext: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    if (!tracker) return;
    tracker.removeGlobalContexts('user-environment');
    tracker.addGlobalContexts({
      globalContexts,
      tag: 'user-environment',
    });
  }, [tracker, globalContexts]);

  const trackScreenViewEvent = useCallback(
    (name: string, contexts?: TTrackingContexts) => {
      const mappedContexts = Object.keys(contexts || []).map(
        (key): EventContext => ({
          data: contexts[key],
          schema: trackingSchemes[key],
        }),
      );
      log.debug('Track screenViewEvent', JSON.stringify({ contexts: mappedContexts, globalContexts, name }, undefined, 2));

      if (!TrackingConfig.isEnabled) {
        return Promise.resolve();
      }

      return tracker.trackScreenViewEvent({ name }, mappedContexts);
    },
    [tracker, globalContexts],
  );

  const trackSelfDescribingEvent = useCallback(
    <T extends keyof TTrackingEvents>(type: T, data: TTrackingEvents[T]) => {
      const mappedData = {
        data,
        schema: trackingSchemes[type],
      };
      log.debug('Track selfDescribingEvent', JSON.stringify({ data: mappedData, globalContexts }, undefined, 2));

      if (!TrackingConfig.isEnabled) {
        return Promise.resolve();
      }

      return tracker.trackSelfDescribingEvent(mappedData);
    },
    [tracker, globalContexts],
  );

  useEffect(() => {
    if (!user?.sub) return;
    if (!tracker) return;

    tracker?.setUserId(user.sub);
  }, [user?.sub, tracker]);

  return (
    <TrackingContext.Provider value={{ trackScreenViewEvent, trackSelfDescribingEvent }}>{children}</TrackingContext.Provider>
  );
};

export default TrackingProvider;
