import { StyleSheet } from 'react-native';

import { colors } from '../../_styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    marginBottom: 10,
  },

  global: {
    backgroundColor: colors.redLight,
    padding: 8,
  },
  globalContent: {
    marginBottom: 0,
    marginLeft: 4,
  },
});
