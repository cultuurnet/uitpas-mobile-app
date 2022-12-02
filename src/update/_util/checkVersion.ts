import { Platform } from 'react-native';
import { Config } from 'react-native-config';

import { TVersion } from '../_models';

export type TCheckedVersion = {
  isBehindMinVersion: boolean;
  isBehindTarget: boolean;
};

export function checkVersion(version: TVersion): TCheckedVersion {
  const currentPlatform = Platform.OS === 'ios' ? 'ios' : 'android';
  const isBehindMinVersion = isVersionGreaterThan(version.minVersion[currentPlatform], Config.REACT_NATIVE_APP_VERSION_NR);

  const isBehindTarget = isVersionGreaterThan(version.targetVersion[currentPlatform], Config.REACT_NATIVE_APP_VERSION_NR);

  return { isBehindMinVersion, isBehindTarget };
}

function isVersionGreaterThan(versionToCheck: string, appVersion: string): boolean {
  const compareNumber = appVersion.localeCompare(versionToCheck, undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  return compareNumber === -1;
}
