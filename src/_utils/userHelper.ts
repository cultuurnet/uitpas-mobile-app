import { TPassHolder } from '../profile/_models';

export function getPassHolderRegions(passHolder: TPassHolder) {
  return passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE');
}

export function getActiveMIARegion(passHolder: TPassHolder) {
  const [MIAInfoFirstActiveCard] = passHolder.cardSystemMemberships.filter(
    card => card.status === 'ACTIVE' && card.socialTariff && !card.socialTariff.expired,
  );
  return MIAInfoFirstActiveCard;
}
