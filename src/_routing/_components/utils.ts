import { TIconName } from '../../_components/icon/Icon';
import { TMainRoutes } from './MainNavigator';

const ICON_MAP: Record<TMainRoutes, TIconName> = {
  Camera: 'QR',
  ProfileNavigator: 'Profile',
  Shop: 'Shop',
};

export function mapRouteNameToIcon(route: TMainRoutes): TIconName {
  return ICON_MAP[route];
}
