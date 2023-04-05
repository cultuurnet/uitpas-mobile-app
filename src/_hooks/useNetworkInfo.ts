import { useCallback, useEffect, useState } from 'react';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';

export function useNetworkInfo(): NetInfoState {
  const networkInfo = useNetInfo();
  const [validatedNetworkInfo, setValidatedNetworkInfo] = useState<NetInfoState>();

  async function doRealNetworkCheck() {
    // Back-up, because we can not trust NetInfo
    const headers = new Headers([
      ['Cache-Control', 'no-cache, no-store, must-revalidate'],
      ['Pragma', 'no-cache'],
      ['Expires', '0'],
    ]);
    try {
      const networkCall = await fetch('https://google.com', { headers });
      // Everything between 200 and 400 means we have a valid network response => connection
      return networkCall.status >= 200 && networkCall.status < 400;
    } catch (err) {
      return false;
    }
  }

  const validateIfInternetIsReachable = useCallback(async () => {
    const result = await doRealNetworkCheck();
    if (!result) {
      setValidatedNetworkInfo(networkInfo);
    }
  }, [networkInfo]);

  useEffect(() => {
    // isInternetReachable could be null
    if (networkInfo.isInternetReachable === false) {
      validateIfInternetIsReachable();
    } else if (networkInfo.isInternetReachable === true) {
      setValidatedNetworkInfo(networkInfo);
    }
  }, [networkInfo, validateIfInternetIsReachable]);

  return validatedNetworkInfo;
}
