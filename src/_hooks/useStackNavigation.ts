import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';

import { TRootStackParamList } from '../_routing/stackParamList';

export function useStackNavigation<T extends ParamListBase = TRootStackParamList>() {
  return useNavigation<NativeStackNavigationProp<T>>();
}
