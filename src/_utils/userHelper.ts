import { TPassHolder } from '../profile/_models';

/** Name of the supra-local card system that covers all regions; it provides no welcome benefits. */
const SUPRA_LOCAL_CARD_SYSTEM_NAME = 'UiTPAS';

export function getPassHolderRegions(passHolder: TPassHolder) {
  return passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE');
}

export function hasOnlySupraLocalCardSystem(passHolder?: TPassHolder) {
  const activeCards = passHolder?.cardSystemMemberships?.filter(card => card.status === 'ACTIVE') ?? [];
  return activeCards.length > 0 && activeCards.every(card => card.cardSystem?.name === SUPRA_LOCAL_CARD_SYSTEM_NAME);
}

export function getActiveMIARegion(passHolder: TPassHolder) {
  const [MIAInfoFirstActiveCard] = passHolder.cardSystemMemberships.filter(
    card => card.status === 'ACTIVE' && card.socialTariff && !card.socialTariff.expired,
  );
  return MIAInfoFirstActiveCard;
}
