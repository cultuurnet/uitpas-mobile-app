import { TPassHolder } from '../profile/_models';

export function getPassHolderRegions(passHolder: TPassHolder) {
  return passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE');
}
