import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { ICustomViewStyle } from 'react-native-skeleton-content-nonexpo/lib/Constants';

import { theme } from '../../_styles/theme';

type TSkeletonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  dark?: boolean;
  layout: ICustomViewStyle[];
};

const SkeletonLoader: FC<TSkeletonProps> = ({ containerStyle, layout, dark = false }) => {
  return (
    <SkeletonContent
      boneColor={theme.palette.neutral[dark ? '200' : '100']}
      containerStyle={containerStyle}
      duration={2000}
      highlightColor={theme.palette.neutral[dark ? '100' : '0']}
      isLoading
      layout={layout.map(style => ({ ...styles.layout, ...style }))}
    />
  );
};

export const styles = StyleSheet.create({
  layout: {
    alignSelf: 'flex-start',
    borderRadius: 4
  },
});


export default SkeletonLoader;