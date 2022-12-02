import { FC, ReactNode, useEffect, useMemo } from 'react';
import { createTracker, EventContext } from '@snowplow/react-native-tracker';

import { TrackingConfig } from '../_config';
import { ConfigEnvironment } from '../_config/environments';
import { useAuthentication } from '../_context/AuthenticationContext';
import { TRoute } from '../_routing';
import { log } from '../_utils/logger';
import { useGetMe } from '../profile/_queries/useGetMe';

type TTrackerProviderProps = {
  children: ReactNode;
  currentRoute: TRoute;
};

const TrackingProvider: FC<TTrackerProviderProps> = ({ children, currentRoute }) => {
  const { user } = useAuthentication();
  const { data, isFetched } = useGetMe();

  const globalContexts: EventContext[] = [
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

  function trackScreenViewEvent(name: TRoute) {
    log.debug('Track screenViewEvent', JSON.stringify({ globalContexts, name }, undefined, 2));

    if (!TrackingConfig.isEnabled) {
      return Promise.resolve();
    }

    return tracker.trackScreenViewEvent({ name });
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
