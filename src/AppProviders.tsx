import React, { FC, PropsWithChildren } from 'react';
import { FlatProviders } from 'react-flat-providers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { QueryClientProvider } from './_providers';
import { theme } from './_styles/theme';

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlatProviders providers={[[ThemeProvider, { theme }], QueryClientProvider, SafeAreaProvider]}>{children}</FlatProviders>
  );
};

export default AppProviders;
