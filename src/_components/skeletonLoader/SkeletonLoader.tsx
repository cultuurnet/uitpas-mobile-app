import React, { FC, useCallback } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import SkeletonContent, { ICustomViewStyle } from 'react-native-reanimated-skeleton';

import { theme } from '../../_styles/theme';

type TSkeletonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  dark?: boolean;
  layout: ICustomViewStyle[];
};

const SkeletonLoader: FC<TSkeletonProps> = ({ containerStyle, layout, dark = false }) => {
  // As suggested in https://github.com/alexZajac/react-native-skeleton-content-nonexpo/issues/41#issuecomment-1138546643
  const MemoizedSkeletonContent = useCallback(
    () => (
      <SkeletonContent
        boneColor={theme.palette.neutral[dark ? '200' : '100']}
        containerStyle={containerStyle}
        duration={2000}
        highlightColor={theme.palette.neutral[dark ? '100' : '0']}
        isLoading
        layout={layout.map(style => ({ ...styles.layout, ...style }))}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <MemoizedSkeletonContent />;
};

export const styles = StyleSheet.create({
  layout: {
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
});

export default SkeletonLoader;
