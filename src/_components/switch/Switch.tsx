import React, { FC } from 'react';
import { Platform, Switch as BaseSwitch, View } from 'react-native';

import { colors } from '../../_styles';
import { Text } from '../text/Text';

import { styles } from './Switch.styles';

type TSwitchProps = {
  label: string;
  name?: string;
  onChange: (value: boolean, name?: string) => void;
  value: boolean;
};

export const Switch: FC<TSwitchProps> = ({ label, value, onChange, name }) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={styles.switchWrapper}>
      <Text>{label}</Text>
      <BaseSwitch
        ios_backgroundColor={colors.greyLight}
        onValueChange={value => onChange(value, name)}
        thumbColor={isAndroid && value ? colors.primary : colors.white}
        trackColor={{ false: colors.grey, true: isAndroid ? colors.primaryLight : colors.primary }}
        value={value}
      />
    </View>
  );
};
