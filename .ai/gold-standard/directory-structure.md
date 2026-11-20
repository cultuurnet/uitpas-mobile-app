# Directory structure

UiTPAS mobile app: Expo (SDK 57) + React Native + TypeScript, single package. Config of source lives in AGENTS.md (toolchain, lint, env). This file maps where code lives and why.

## Shared namespaces (always `_` prefix)

| Folder | Contents | Barrel |
|--------|----------|--------|
| `src/_assets/` | PNG icons (`@1x/@2x/@3x`), images | `icons/index.ts` — one named export per icon |
| `src/_components/` | App-wide reusable components | `index.ts` — named exports, default-exported components re-exported by name |
| `src/_config/` | `env.ts` reads `EXPO_PUBLIC_*` via `app.config.ts` extra | — |
| `src/_context/` | App-wide React contexts | `index.ts` — exports Provider + `useX` hook per provider |
| `src/_hooks/` | App-wide hooks | `index.ts` |
| `src/_http/` | Axios `HttpClient`, `TApiError`, `HttpStatus` | `index.ts` |
| `src/_models/` | App-wide types (`TPaginatedResponse`, storage keys) | `index.ts` — `export * from './x'` |
| `src/_routing/` | Navigation types + navigators | `index.ts` re-exports from `_components/` |
| `src/_styles/` | `theme.ts` (palette, common spacing), constants | — |
| `src/_translations/` | `i18n.ts`, `locales/nl.json` (Dutch only) | — |
| `src/_utils/` | Pure helpers grouped per topic (`dateHelpers.ts`, `urlHelper.ts`, ...) | `index.ts` |

`src/storage.ts` sits at `src/` root (MMKV storage wrapper).

## Feature module (gold standard: `src/shopDetail/`, cross-checked with `src/shop/`)

```
src/shopDetail/
├── ShopDetail.tsx                  # screen: named export + TProps (or default export; see screen.md)
├── style.ts                        # screen styles, one styled block per layout part
├── _models/                        # API response types only (T-prefixed), one domain concept per file
│   ├── redeemStatus.ts             #   e.g. TRedeemStatus + its T-prefixed string union types
│   └── organizer.ts
├── _queries/                       # one hook per file, useX naming, only usePubliqApi calls
│   ├── useGetRedeemStatus.ts
│   ├── useGetOrganizer.ts
│   └── useRedeemReward.ts          #   mutations named without "Get"
└── _components/                    # feature-local components
    ├── section/
    │   ├── Section.tsx             #   PascalName.tsx
    │   └── style.ts                #   sibling style.ts, `export const X = styled...`
    └── redeemFamilyMembers/
        ├── RedeemFamilyMembers.tsx
        └── redeemFamilyButton/     # nested sub-component folders allowed
            ├── RedeemFamilyButton.tsx
            └── style.ts
```

Key rules:

- `_`-prefixed folders are shared code; plain folders are one feature per screen (screen + its `_models/_queries/_components`).
- Feature-local components get their own folder `<camelName>/` with `<PascalName>.tsx` + `style.ts`; the component file name matches the folder (case aside).
- One `useGetX` (or `useX` for mutations) hook per file in `_queries/`; every API call goes through `usePubliqApi` (`src/_hooks/usePubliqApi.ts`) — never raw `HttpClient` in features.
- Types imported cross-feature only from `_models` barrel files (`../shop/_models/reward`), never deep component imports.
- Pure logic helpers go in a feature `_helpers/` folder (e.g. `src/shop/_helpers/getRewardFilters.ts`) when they are used by multiple components of the feature.
- Feature constants live in a feature `config.ts` (e.g. `src/shop/config.ts` → `initialFilters`) or top-of-file `SCREAMING_SNAKE` constants.
- **No test convention exists in this repo** (no test runner in `package.json`, no `*.test.*` files). Don't invent one; verification = `pnpm lint` + `pnpm check-types`.
- Loading UI is provided by `SkeletonLoader` / `RewardLoader` components, not test fixtures.
