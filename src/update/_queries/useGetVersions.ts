import { useQuery } from '@tanstack/react-query';

import { ConfigUrl } from '../../_config';
import { HttpClient } from '../../_http';
import { TVersion } from '../_models';
import { checkVersion } from '../_util/checkVersion';

function getVersions() {
  return HttpClient.get<TVersion>(ConfigUrl.version);
}

export function useGetVersions() {
  const { data: versions } = useQuery({
    queryKey: ['versions'] as const,
    queryFn: getVersions,
    refetchOnWindowFocus: true,
  });

  return versions ? checkVersion(versions) : undefined;
}
