import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type Props = {
  onBackground?: () => void;
  onChange?: (nextAppState: AppStateStatus) => void;
  onForeground?: () => void;
};

export const useAppState = ({ onChange, onForeground, onBackground }: Props = {}) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && appState !== 'active') {
        onForeground?.();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        onBackground?.();
      }
      setAppState(nextAppState);
      onChange?.(nextAppState);
    };
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => appStateListener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return { appState };
};
