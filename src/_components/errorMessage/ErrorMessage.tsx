import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Icon } from '../icon/Icon';
import { Text } from '../text/Text';

import { styles } from './ErrorMessage.styles';

type TProps = {
  children: string | React.ReactElement<Text>[] | React.ReactElement<Text>;
  isGlobal?: boolean;
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
};

export const ErrorMessage: FC<TProps> = ({ style, children, isGlobal = false, isVisible }) => {
  if (isVisible && !!children)
    return (
      <View style={[styles.container, isGlobal && styles.global, style]}>
        {isGlobal && <Icon color="errorText" name="Warning" size={24} />}
        <Text
          color="errorText"
          size="small"
          style={[styles.content, isGlobal && styles.globalContent]}
          weight={isGlobal ? 'bold' : 'semiBold'}
        >
          {children}
        </Text>
      </View>
    );

  return null;
};
