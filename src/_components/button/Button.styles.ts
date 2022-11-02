import { StyleSheet } from 'react-native';

import { constants } from '../../_styles';

export const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    minWidth: 64,
  },
  compact: {
    minWidth: 'auto',
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 12,
    marginRight: -4,
  },
  iconReverse: {
    marginLeft: -4,
    marginRight: 12,
  },
  label: {
    letterSpacing: 1,
    marginHorizontal: constants.defaultSpacing,
    marginVertical: constants.spacingVertical,
    textAlign: 'center',
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
});
