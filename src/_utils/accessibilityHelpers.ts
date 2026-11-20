import { AccessibilityInfo } from 'react-native';

/**
 * Announces a dynamic status message to VoiceOver/TalkBack without interrupting
 * current speech. iOS honours the low priority and queue options; Android falls
 * back to announceForAccessibility (TYPE_ANNOUNCEMENT).
 */
export function announceStatus(message: string) {
  AccessibilityInfo.announceForAccessibilityWithOptions(message, { priority: 'low', queue: true });
}
