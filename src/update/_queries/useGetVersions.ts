import { useQuery } from '@tanstack/react-query';

import { ConfigUrl } from '../../_config';
import { HttpClient } from '../../_http';
import { TVersion } from '../_models';
import { checkVersion } from '../_util/checkVersion';

function getVersions(): Promise<TVersion> {
  return HttpClient.get<TVersion>(ConfigUrl.version);
}

export function useGetVersions() {
  const { data: versions } = useQuery<TVersion, unknown>(['versions'], () => getVersions());
  return checkVersion(versions);
}
