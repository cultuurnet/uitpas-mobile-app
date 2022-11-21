import { TIconName } from '../../_components/icon/Icon';
import { TMainRoutes } from './MainNavigator';

const ICON_MAP: Record<TMainRoutes, TIconName> = {
  ProfileNavigator: 'Profile',
  Scan: 'QR',
  Shop: 'Shop',
};

export function mapRouteNameToIcon(route: TMainRoutes): TIconName {
  return ICON_MAP[route];
}
