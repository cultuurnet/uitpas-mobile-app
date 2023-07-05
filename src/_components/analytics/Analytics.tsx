import { useEffect } from 'react';

import { useTracking } from '../../_context';

type TProps = {
  screenName?: string;
};

const Analytics = ({ screenName }: TProps) => {
  const { trackScreenViewEvent } = useTracking();

  useEffect(() => {
    if (!screenName) return;

    trackScreenViewEvent(screenName);
  }, [screenName, trackScreenViewEvent]);

  return null;
};

export default Analytics;
