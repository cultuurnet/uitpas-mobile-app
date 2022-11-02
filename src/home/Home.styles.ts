import { StyleSheet } from 'react-native';

import { colors } from '../_styles';

export const styles = StyleSheet.create({
  button: {
    marginBottom: 6,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowItem: {
    marginLeft: 6,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  section: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
