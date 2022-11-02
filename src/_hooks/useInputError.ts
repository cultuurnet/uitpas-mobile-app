import { useEffect } from 'react';

import { TValidatorResponse } from '../_utils/formValidation';
import { useToggle } from './useToggle';

type TResponse = {
  setDirty: () => void;
  showError: boolean;
};

export function useInputError(validation?: TValidatorResponse): TResponse {
  const [isDirty, setIsDirty] = useToggle(false);

  useEffect(() => {
    setIsDirty(false);
  }, [validation, setIsDirty]);

  return {
    setDirty: () => setIsDirty(true),
    showError: !validation?.isValid && validation?.message && !isDirty,
  };
}
