import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useTracking } from '../../_context';
import { TTrackingData } from '../../_models/tracking';

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

      // We don't want to track the screen view again if the data changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenName]),
  );

  return null;
};

export default Analytics;
