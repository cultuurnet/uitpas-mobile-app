import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { StorageKey } from '../_models';
import { storage } from '../storage';

type TOnboardingContext = {
  dismissFamilyOnboarding: () => void;
  showFamilyOnboarding: boolean;
};

const OnboardingContext = createContext<TOnboardingContext>(null);

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showFamilyOnboarding, setShowFamilyOnboarding] = useState(!storage.getBoolean(StorageKey.HasSeenFamilyOnboarding));

  const dismissFamilyOnboarding = useCallback(() => {
    setShowFamilyOnboarding(false);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        dismissFamilyOnboarding,
        showFamilyOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
