# Context (app-wide state)

Source of truth: `src/_context/` — `AuthenticationContext.tsx`, `OnboardingProvider.tsx`, `TrackingProvider.tsx`, `QueryClientProvider.tsx`, `index.ts`.

Decision: no feature-level global state convention exists (no Redux/Zustand/`store.md` patterns). Cross-screen state is either **server cache** (TanStack Query via `usePubliqApi`) or **one of four app-wide contexts**. Feature-local state is `useState`/`useToggle` in the screen.

## Skeleton (consuming)

```tsx
import { queryClient, useTracking } from '../../_context';

const { trackSelfDescribingEvent } = useTracking();   // analytics everywhere
queryClient.invalidateQueries({ queryKey: ['me'] });  // cache invalidation from mutations
```

## Skeleton (new provider — only if app-wide and consumed by 2+ features)

```tsx
// src/_context/{Name}Context.tsx
const {Name}Context = createContext<T{Name}Context>({ ...defaults });
const {Name}Context: FC = ({ children }) => {
  // state + effects
  return <{Name}Context.Provider value={value}>{children}</{Name}Context.Provider>;
};
export default {Name}Context;
```
```ts
// src/_context/index.ts — Provider + hook pair, alphabetical
export { default as {Name}Provider, use{Provider} } from './{Name}Context';
```

## Key rules

- **Existing providers**: `AuthenticationProvider`/`useAuthentication` (token, auth state), `OnboardingProvider`/`useOnboarding`, `TrackingProvider`/`useTracking`, `QueryClientProvider`/`queryClient` (TanStack + MMKV persister, 1h gcTime, app-state focus sync).
- Context files export default provider + named hook; the barrel exports **both** as named exports (`export { default as X, useX } from './X'`).
- `queryClient` is imported directly for invalidation inside mutation hooks and modals — no `useQueryClient` wrapper convention.
- Feature-local UI state (modal visibility via `useToggle`, selections via `useState`) never goes into context.
- Persisted flags go through `src/storage.ts` (`storage.getBoolean/set`, `StorageKey` enum in `_models`), not context.
