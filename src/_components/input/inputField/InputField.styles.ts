import { StyleSheet } from 'react-native';

import { colors, getFont } from '../../../_styles';

export const styles = StyleSheet.create({
  error: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorText,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.greyLight,
    borderColor: colors.greyLight,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    ...getFont(),
  },
});
