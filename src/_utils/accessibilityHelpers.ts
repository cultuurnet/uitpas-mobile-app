import { AccessibilityInfo, findNodeHandle } from 'react-native';
import { TFunction } from 'i18next';

import { TReward } from '../shop/_models/reward';

/**
 * Announces a dynamic status message to VoiceOver/TalkBack without interrupting
 * current speech. iOS honours the low priority and queue options; Android falls
 * back to announceForAccessibility (TYPE_ANNOUNCEMENT).
 */
export function announceStatus(message: string) {
  AccessibilityInfo.announceForAccessibilityWithOptions(message, { priority: 'low', queue: true });
}

/**
 * Moves VoiceOver/TalkBack focus to a mounted native element, e.g. back to the
 * button that opened a modal after the modal has been dismissed.
 */
export function focusAccessibilityElement(target: Parameters<typeof findNodeHandle>[0] | null) {
  const reactTag = target == null ? null : findNodeHandle(target);
  if (reactTag != null) {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
}

/**
 * Builds the accessible name of a reward card from the parts that are visibly
 * rendered on it, so voice control users can speak the visible text. The title
 * always comes first.
 */
export function getRewardAccessibilityLabel(
  reward: TReward,
  t: TFunction,
  { isRedeemed, subtitle, withOrganizer = true }: { isRedeemed?: boolean; subtitle?: string; withOrganizer?: boolean } = {},
): string {
  return [
    reward.title,
    !isRedeemed && reward.points ? t('GENERAL.POINTS', { count: reward.points }) : null,
    !isRedeemed && reward.online ? t('SHOP.ONLINE_REWARD') : null,
    withOrganizer ? (subtitle ?? (reward.organizers.length === 1 ? reward.organizers[0]?.name : null)) : null,
    t(isRedeemed ? 'SHOP.REWARD_CARD.ACTION_REDEEMED' : 'SHOP.REWARD_CARD.ACTION'),
  ]
    .filter(Boolean)
    .join(', ');
}
