import { Typography } from '../_components';
import { theme } from './theme';

export const generalStyles = {
  navigationHeader: {
    headerBackTitleStyle: { fontFamily: 'Poppins-SemiBold' },
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: theme.palette.secondary['500'],
    },
    headerTintColor: theme.palette.neutral['0'],
    headerTitle: ({ children }) => <Typography color="neutral.0" fontStyle="semibold" size="large">{children}</Typography>,
  },
};
