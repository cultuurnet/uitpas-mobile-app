# Model (API types)

Source of truth: `src/shop/_models/reward.ts`, `src/shopDetail/_models/redeemStatus.ts`, `src/shopDetail/_models/organizer.ts`, cross-checked `src/shop/_models/searchFilters.ts`.

Location: `<feature>/_models/<domainConcept>.ts` — one domain concept per file, camelCase filename matching the main type.

## Skeleton

```ts
// Optional: string-literal unions for every closed set of API values, alphabetical members
export type T{Entity}Status = 'ACTIVE' | 'DELETED' | 'INACTIVE';
export type T{Entity}Reason =
  | 'INVALID_CARD' // trailing comment explaining the API value
  | 'PASSHOLDER_VOLUME';

// Optional: nested value types before the main type, alphabetical keys
export type T{Nested} = {
  begin: string;
  end?: string;
};

// Main type: T-prefixed PascalName, keys alphabetical (enforced), optionals marked with ?
export type T{Entity} = {
  allCardSystems: boolean;
  applicableCardSystems: TCardSystem[];
  categories: T{Entity}Category[];
  id: string;
  moreInfoURL: string;
  modified?: string;
  name: Record<string, string>;       // localized maps: Record<lang, value>
  pictures: string[];
  points: number;
  '@context': string;                 // JSON-LD style keys allowed, quoted
  workflowStatus: string;
};

// Optional: API list envelope
export type T{Entity}sResponse = {
  facet: unknown;
  member: T{Entity}[];
  totalItems: number;
};
```

## Key rules

- **`T` prefix for every exported type** (`TReward`, `TRedeemStatus`, `TSearchFilters`) — no interfaces, always `type`.
- Keys alphabetically sorted (ESLint `sort-keys-fix` will rewrite; run `pnpm lint --fix`). JSON-LD keys like `'@id'`, `'@context'` are quoted strings, sorted with the rest.
- Every closed set of API strings becomes a `T`-prefixed union type (`TRedeemReason`, `TRewardCategory`, `TRedeemConstraintPeriod`) with an optional trailing comment per member explaining the value.
- Localized fields typed `Record<string, string>`; consumers resolve with `getLanguage()` + `nl` fallback (see `_utils/languageHelpers`).
- Unknown/unused API shapes typed `unknown` (`facet: unknown`), never `any`.
- Cross-feature imports always from the other feature's `_models` file (`import { TPassHolder } from '../../profile/_models'`) — shared primitives (`TPaginatedResponse`) live in `src/_models/` and are re-exported via its `index.ts`.
- Feature-local helper unions (`TFilterRewardSection`) may live in `_helpers/` instead of `_models/` when they describe app logic, not API payloads (`src/shop/_helpers/getRewardFilters.ts`).
- No runtime code in `_models` — types only.
