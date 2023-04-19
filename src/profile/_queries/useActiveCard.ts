import { useGetMe } from './useGetMe';

export const useActiveCard = () => {
  const { data: passHolder } = useGetMe();

  if (!passHolder) return null;

  const [firstActiveCard] = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.uitpasNumber);
  return firstActiveCard;
};
