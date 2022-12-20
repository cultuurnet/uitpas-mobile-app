import { TMainRoutes } from './_components/MainNavigator';
import { TProfileRoutes } from './_components/ProfileNavigator';
import { RootStackNavigator, TRootRoutes } from './_components/RootStackNavigator';

export type TRoute = TRootRoutes | TMainRoutes | TProfileRoutes;
export default RootStackNavigator;
