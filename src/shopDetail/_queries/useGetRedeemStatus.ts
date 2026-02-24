import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TPassHolder } from '../../profile/_models';
import { TRedeemStatus } from '../_models/redeemStatus';

type TProps = { passHolder: TPassHolder; rewardId: string };

export function useGetRedeemStatus({ passHolder, rewardId }: TProps) {
  const api = usePubliqApi();

  const [firstActiveCard] = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.uitpasNumber);

  return api.get<TRedeemStatus>(
    ['redeem-status', rewardId, firstActiveCard.uitpasNumber],
    `/rewards/${rewardId}/redeem-status?uitpasNumber=${firstActiveCard.uitpasNumber}`,
    {
      enabled: !!passHolder.id && !!firstActiveCard.uitpasNumber,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 1000 * 60,
    },
  );
}
