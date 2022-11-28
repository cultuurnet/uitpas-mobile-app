import { FC, ReactNode, useEffect, useMemo } from 'react';
import { Config } from 'react-native-config';
import { createTracker, EventContext } from '@snowplow/react-native-tracker';

import { TrackingConfig } from '../_config';
import { ConfigEnvironment } from '../_config/environments';
import { useAuthentication } from '../_context/AuthenticationContext';
import { TRoute } from '../_routing';
import { useGetMe } from '../profile/_queries/useGetMe';

type TTrackerProviderProps = {
  children: ReactNode;
  currentRoute: TRoute;
};

const TrackingProvider: FC<TTrackerProviderProps> = ({ children, currentRoute }) => {
  const { user } = useAuthentication();
  const { data, isFetched } = useGetMe();

  const tracker = useMemo(() => {
    if (!TrackingConfig.isEnabled) return;

    const result = createTracker(
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

    return result;
  }, []);

  function trackScreenViewEvent(name: TRoute) {
    const contexts: EventContext[] = [
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
    ];

    if (Config.REACT_NATIVE_APP_ENABLE_ANALYTICS_LOGGING === 'true') {
      console.info('Track screenViewEvent', JSON.stringify({ contexts, name }, undefined, 2));
    }

    if (!TrackingConfig.isEnabled) {
      return Promise.resolve();
    }

    return tracker.trackScreenViewEvent({ name }, contexts);
  }

  useEffect(() => {
    if (!user?.sub) return;
    if (!tracker) return;

    tracker?.setUserId(user.sub);
  }, [user?.sub, tracker]);

  useEffect(() => {
    if (!currentRoute) return;
    trackScreenViewEvent(currentRoute);
  }, [currentRoute]);

  return <>{children}</>;
};

export default TrackingProvider;
