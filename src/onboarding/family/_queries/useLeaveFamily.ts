import { usePubliqApi } from '../../../_hooks/usePubliqApi';

export const useLeaveFamily = () => {
  const api = usePubliqApi();

  return api.deleteMutation(['family-leave']);
};
