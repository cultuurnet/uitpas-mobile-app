import { useQuery } from '@tanstack/react-query';

import { ConfigUrl } from '../../_config';
import { HttpClient } from '../../_http';
import { TVersion } from '../_models';

function getVersions(): Promise<TVersion> {
  return HttpClient.get<TVersion>(ConfigUrl.version);
}

export function useGetVersions() {
  return useQuery<TVersion, unknown>(['versions'], () => getVersions());
}
