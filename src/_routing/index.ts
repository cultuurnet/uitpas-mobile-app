import { TMainRoutes } from './_components/MainNavigator';
import { TProfileRoutes } from './_components/ProfileNavigator';
import { RootStackNavigator, TRootRoutes } from './_components/RootStackNavigator';
import { TScanRoutes } from './_components/ScanNavigator';

export type TRoute = TRootRoutes | TMainRoutes | TProfileRoutes | TScanRoutes;
export default RootStackNavigator;
