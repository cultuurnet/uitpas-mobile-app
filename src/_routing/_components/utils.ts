import { TMainRoutes } from './MainNavigator';

export function mapRouteNameToIcon(route: TMainRoutes): 'Profile' | 'QR' | 'Shop' {
  switch (route) {
    case 'Profile':
      return 'Profile';
    case 'Scan':
      return 'QR';
    case 'Shop':
      return 'Shop';
    default:
      break;
  }
}
