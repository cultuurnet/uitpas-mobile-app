import { TPassHolder } from '../_models';

type TProps = {
  passHolder: TPassHolder;
};

export const getActiveCard = ({ passHolder }: TProps) => {
  if (!passHolder) return null;

  const [firstActiveCard] = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.uitpasNumber);
  return firstActiveCard;
};
