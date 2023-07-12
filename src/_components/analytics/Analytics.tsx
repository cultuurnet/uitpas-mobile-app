import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useTracking } from '../../_context';
import { TTrackingData } from '../../_models';

type TProps = {
  data?: TTrackingData;
  screenName?: string;
};

const Analytics = ({ screenName, data }: TProps) => {
  const { trackScreenViewEvent } = useTracking();

  useFocusEffect(
    useCallback(() => {
      if (!screenName) return;

      trackScreenViewEvent(screenName, data);
    }, [screenName, trackScreenViewEvent, data]),
  );

  return null;
};

export default Analytics;
