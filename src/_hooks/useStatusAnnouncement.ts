import { useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { announceStatus } from '../_utils';

/**
 * Announces a status message once per distinct value while the screen is focused.
 * Re-renders, refocusing and returning to a mounted screen do not re-announce.
 * Clearing the message (null/undefined) resets the guard, so a later identical
 * outcome is announced again.
 */
export function useStatusAnnouncement(message: string | null) {
  const isFocused = useIsFocused();
  const lastAnnouncedMessage = useRef<string | null>(null);

  useEffect(() => {
    if (!message) {
      lastAnnouncedMessage.current = null;
      return;
    }

    if (!isFocused || lastAnnouncedMessage.current === message) return;

    lastAnnouncedMessage.current = message;
    announceStatus(message);
  }, [isFocused, message]);
}
