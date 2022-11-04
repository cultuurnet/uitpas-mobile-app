import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';
import { TRootParams } from '../_routing/_components/RootStackNavigator';

export function useStackNavigation<T extends ParamListBase = TRootParams>() {
  return useNavigation<NativeStackNavigationProp<T>>();
}
