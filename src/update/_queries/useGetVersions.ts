import { useQuery } from '@tanstack/react-query';

import { HttpClient } from '../../_http';
import { TVersion } from '../_models';
import { checkVersion } from '../_util/checkVersion';

function getVersions(): Promise<TVersion[]> {
  return HttpClient.get<TVersion[]>('https://663a23451ae792804bee3482.mockapi.io/versions');
}

export function useGetVersions() {
  const { data: versions } = useQuery<TVersion[], unknown>(['versions'], () => getVersions(), {
    cacheTime: 0,
    networkMode: 'online',
    refetchOnWindowFocus: 'always',
  });
  return versions?.[0] ? checkVersion(versions[0]) : undefined;
}
