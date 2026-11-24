import { Platform } from 'react-native';

export const isLiquidGlass = Platform.OS === 'ios' && parseInt(String(Platform.Version), 10) >= 26;
