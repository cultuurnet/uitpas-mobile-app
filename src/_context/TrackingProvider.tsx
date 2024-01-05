import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { createTracker, EventContext as EventTrackingData } from '@snowplow/react-native-tracker';

import { TrackingConfig, trackingSchemes } from '../_config';
import { ConfigEnvironment } from '../_config/environments';
import { TFamilyTrackingData, TTrackingData, TTrackingEvents } from '../_models';
import { getActiveMIARegion, log } from '../_utils';
import { useGetFamilyMembers } from '../onboarding/family/_queries';
import { useGetMe } from '../profile/_queries/useGetMe';
import { useAuthentication } from './AuthenticationContext';

type TTrackingContext = {
  trackScreenViewEvent: (name: string, trackingData?: TTrackingData) => Promise<void>;
  trackSelfDescribingEvent: <T extends keyof TTrackingEvents>(
    type: T,
    eventData: TTrackingEvents[T],
    trackingData?: TTrackingData,
  ) => Promise<void>;
};

const TrackingContext = createContext<TTrackingContext>(null);

export const useTracking = () => useContext(TrackingContext);

const TrackingProvider = ({ children }) => {
  const { user } = useAuthentication();
  const { data: me, isFetched: isMeFetched } = useGetMe();
  const { data: familyMembers, isFetched: isFamilyMembersFetched } = useGetFamilyMembers();

  const familyInfo = useMemo(() => {
    return familyMembers?.reduce(
      (familyInfo, member) => {
        familyInfo.size += 1;
        if (getActiveMIARegion(member.passholder)) {
          familyInfo['size-with-kansenstatuut'] += 1;
        }
        return familyInfo;
      },
      { size: 0, 'size-with-kansenstatuut': 0 } as TFamilyTrackingData,
    );
  }, [familyMembers]);

  const globalTrackingData: EventTrackingData[] = useMemo(
    () => [
      {
        data: {
          environment: ConfigEnvironment,
        },
        schema: TrackingConfig.appEnvironmentSchema,
      },
      ...(isMeFetched && me?.id
        ? [
            {
              data: {
                id: me?.id,
              },
              schema: TrackingConfig.passHolderSchema,
            },
          ]
        : []),
      ...(isFamilyMembersFetched && familyMembers?.length
        ? [
            {
              data: {
                family: familyInfo,
              },
              schema: TrackingConfig.familySchema,
            },
          ]
        : []),
    ],
    [isMeFetched, me?.id, isFamilyMembersFetched, familyMembers?.length, familyInfo],
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
      globalContexts: globalTrackingData,
      tag: 'user-environment',
    });
  }, [tracker, globalTrackingData]);

  const trackScreenViewEvent = useCallback(
    (name: string, trackingData?: TTrackingData) => {
      const mappedTrackingData = Object.keys(trackingData || []).map(
        (key): EventTrackingData => ({
          data: trackingData[key],
          schema: trackingSchemes[key],
        }),
      );
      log.info(
        'Track screenViewEvent',
        JSON.stringify({ globalTrackingData, name, trackingData: mappedTrackingData }, undefined, 2),
      );

      if (!TrackingConfig.isEnabled) {
        return Promise.resolve();
      }

      return tracker.trackScreenViewEvent({ name }, mappedTrackingData);
    },
    [tracker, globalTrackingData],
  );

  const trackSelfDescribingEvent = useCallback(
    <T extends keyof TTrackingEvents>(type: T, eventData: TTrackingEvents[T], trackingData?: TTrackingData) => {
      const mappedEventData = {
        data: eventData,
        schema: trackingSchemes[type],
      };
      const mappedTrackingData = Object.keys(trackingData || []).map(
        (key): EventTrackingData => ({
          data: trackingData[key],
          schema: trackingSchemes[key],
        }),
      );
      log.info(
        'Track selfDescribingEvent',
        JSON.stringify({ eventData: mappedEventData, globalTrackingData, trackingData: mappedTrackingData }, undefined, 2),
      );

      if (!TrackingConfig.isEnabled) {
        return Promise.resolve();
      }

      return tracker.trackSelfDescribingEvent(mappedEventData, mappedTrackingData);
    },
    [tracker, globalTrackingData],
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
