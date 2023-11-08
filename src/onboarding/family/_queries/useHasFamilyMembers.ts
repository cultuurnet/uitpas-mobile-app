import { useState } from 'react';

import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { TFamilyMember } from '../../../profile/_models';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export function useHasFamilyMembers() {
  const api = usePubliqApi();
  const { data: user } = useGetMe();
  const [hasFamilyMembers, setHasFamilyMembers] = useState(false);

  const response = api.get<TFamilyMember>(['family-members'], `/passholders/${user?.id}/family-members`, {
    enabled: !!user?.id,
    onError: error => setHasFamilyMembers(error.status !== 403),
    retry: false,
  });

  return { ...response, data: hasFamilyMembers };
}
