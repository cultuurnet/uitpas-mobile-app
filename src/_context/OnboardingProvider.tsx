import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { StorageKey } from '../_models';
import { storage } from '../storage';

type TOnboardingContext = {
  dismissFamilyOnboarding: () => void;
  withFamilyOnboarding: boolean;
};

const OnboardingContext = createContext<TOnboardingContext>({
  dismissFamilyOnboarding: () => {},
  withFamilyOnboarding: !storage.getBoolean(StorageKey.HasSeenFamilyOnboarding),
});

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [withFamilyOnboarding, setWithFamilyOnboarding] = useState(!storage.getBoolean(StorageKey.HasSeenFamilyOnboarding));

  const dismissFamilyOnboarding = useCallback(() => {
    setWithFamilyOnboarding(false);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        dismissFamilyOnboarding,
        withFamilyOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
