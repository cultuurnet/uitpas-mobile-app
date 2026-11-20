# Service (query/mutation hooks)

Source of truth: `src/_hooks/usePubliqApi.ts` (the only API gateway), `src/shopDetail/_queries/*`, `src/shop/_queries/*`.

Location: `<feature>/_queries/use{Verb}{Entity}.ts` — one hook per file. GETs: `useGetX`. Mutations: `useX` (`useRedeemReward`). Name files after the hook.

## Skeleton — query

```ts
import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TOtherModel } from '../../otherFeature/_models';
import { TModel } from '../_models/model';

type TProps = { id: string; filter?: TFilter };

export function useGetThing({ id, filter }: TProps) {
  const api = usePubliqApi();                        // or usePubliqApi('uitdatabank') for public API

  return api.get<TModel>(
    ['things', id, filter?.slug],                    // queryKey: hierarchy + identity params
    `/things/${id}`,                                 // path, params appended by HttpClient
    {
      enabled: !!id,                                 // gate on prerequisite data
      // refetchOnWindowFocus, staleTime, retry... TanStack options pass through
    },
  );
}
```

## Skeleton — mutation

```ts
import { queryClient } from '../../_context';
import { TPostOptions, usePubliqApi } from '../../_hooks/usePubliqApi';
import { TResultModel } from '../../otherFeature/_models';

export function useRedeemThing(options: TPostOptions<TResultModel>) {
  const api = usePubliqApi();

  return api.post<TResultModel>(['things-redeem'], '/things/redeemed', {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });   // invalidate affected caches
      options.onSuccess(...args);                            // always chain the caller's callback
    },
  });
}
```

## Skeleton — infinite list

```ts
export function useGetThings({ itemsPerPage = 20, enabled = true, filters = {...}, sort = '-redeemCount' }: TProps = {}) {
  const api = usePubliqApi();
  const params = useMemo(() => ({ ...filters, sort, ... }), [filters, sort]);   // build params in useMemo

  return api.getInfinite<TPaginatedResponse<TModel>>(
    ['things', params, itemsPerPage],
    `/things`,
    { enabled, itemsPerPage, params },
  );
}
```

## Key rules

- **Always `usePubliqApi`** — it injects the bearer token and picks the host. Pass `'uitdatabank'` for unauthenticated public API calls (`useGetOrganizer`); default `'uitpas'`.
- **queryKey mirrors identity**: `['rewards', id]`, `['redeem-status', rewardId, uitpasNumber]`, `['rewards', params, itemsPerPage]` — anything the response depends on goes in the key.
- **`enabled` gates execution** on prerequisite data: `enabled: !!id`, `enabled: !!passHolder.id && !!firstActiveCard.uitpasNumber`, or user-driven (`enabled: search.length > 0`).
- **Hooks may compose other hooks**: `useGetRewards` calls `useGetMe` internally to resolve user-derived filters. Keep such derived params in `useMemo`.
- **Mutations**: options object is `TPostOptions<T>` (TanStack `UseMutationOptions` minus `queryFn`/`mutationKey`/`networkMode`, plus `headers`). Destructure `{ mutate, isPending, error }` at the call site.
- **Cache invalidation on success**: invalidate affected queries inside the hook's `onSuccess` wrapper, then call the caller's `options.onSuccess(...args)` — both levels add invalidations (`useRedeemReward` + `RedeemModal`).
- **Defaults declared in the destructure** (`itemsPerPage = 20`, `sort = '-redeemCount'`), whole props object defaulted `= {}` when everything is optional.
- Per-request TanStack tuning (`refetchOnWindowFocus: true`, `staleTime: 0`, `retry: false`) lives in the hook, not the call site.
- Pagination envelope is `TPaginatedResponse<T>` (`{ member, totalItems }` from `src/_models/api.ts`); feature code uses `usePubliqApi`, not raw `HttpClient`. Existing exceptions call `HttpClient` directly from a hand-written `useQuery`/`queryFn` when the request falls outside the UiTPAS/UiTdatabank hosts or default auth (`src/update/_queries/useGetVersions.ts`, `src/onboarding/family/_queries/useGetRegistrationToken.ts`). Only follow that route when `usePubliqApi` cannot express the request.
