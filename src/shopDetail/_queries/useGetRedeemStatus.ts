import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { useActiveCard } from '../../profile/_queries/useActiveCard';
import { TRedeemStatus } from '../_models/redeemStatus';

export function useGetRedeemStatus({ id }: { id: string }) {
  const activeCard = useActiveCard();
  const api = usePubliqApi();

  return api.get<TRedeemStatus>(['redeem-status', id], `/rewards/${id}/redeem-status?uitpasNumber=${activeCard.uitpasNumber}`, {
    cacheTime: 0,
    enabled: !!id && !!activeCard.uitpasNumber,
    refetchOnWindowFocus: true,
  });
}
