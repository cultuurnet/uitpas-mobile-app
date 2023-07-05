import { useEffect } from 'react';

import { useTracking } from '../../_context';
import { TTrackingContexts } from '../../_models/tracking';

type TProps = {
  contexts?: TTrackingContexts;
  screenName?: string;
};

const Analytics = ({ screenName, contexts }: TProps) => {
  const { trackScreenViewEvent } = useTracking();

  useEffect(() => {
    if (!screenName) return;

    trackScreenViewEvent(screenName, contexts);
  }, [screenName, trackScreenViewEvent, contexts]);

  return null;
};

export default Analytics;
