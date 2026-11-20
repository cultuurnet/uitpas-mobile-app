# Navigation (routes, params, navigators)

Source of truth: `src/_routing/_components/TRootStackParamList.ts`, `RootStackNavigator.tsx`, `MainNavigator.tsx`; consumers: `Shop.tsx`, `ShopDetail.tsx`, `Search.tsx`, `RedeemModal.tsx`.

## Two navigators

- `TRootStackParamList` (`native stack`, `RootStackNavigator`) — everything: auth flow, family onboarding, stacked detail screens, modals.
- `TMainParamsList` (`bottom tabs`, `MainNavigator`) — only `Shop`, `Camera`, `Profile`. `TMainNavigationProp` is a `CompositeNavigationProp` of tab + root stack, so tab screens can also push root routes.

## Adding a new screen

1. **Params** — add to `TRootStackParamList` (alphabetical order, keys sorted):
```ts
export type TRootStackParamList = {
  // ...
  ShopDetail: { id: string; reward?: TReward; showFamilyMembers?: boolean };  // params object; optional keys when screen works without
};
```
`undefined` for no params: `Login: undefined`. Param types come from feature `_models`/`_helpers` (`TSearchFilters`, `TFilterRewardCategory`) — import them at the top of `TRootStackParamList.ts`.
2. **Component** — register in `RootStackNavigator` inside the authenticated group:
```tsx
<RootStack.Screen
  component={ShopDetail}
  name="ShopDetail"
  options={{
    headerBackButtonDisplayMode: 'minimal',
    headerRight: UserPoints,                 // points component in header, standard for content screens
    title: i18n.t('SHOP_DETAIL.HEADER_TITLE'),   // header titles via i18n.t, not t()
  }}
/>
```
Modals: `presentation: 'modal'` (+ `headerLeft: null` and a close `HeaderBackButton` in `headerRight`/`headerBackVisible: false`). Screens hidden from gesture: `gestureEnabled: false`. Conditional screens (onboarding/update) render inside `{isAuthenticated && ...}` blocks with `RootStack.Group`.
3. **Navigate**:
```tsx
// stacked screen component: props-based
const ShopDetail = ({ navigation, route }: TProps) => { navigation.push('ShopDetail', { id }); };

// deeper in the tree: hook
const { push, navigate } = useNavigation<TMainNavigationProp>();
const { navigate } = useStackNavigation<TRootStackParamList>();     // thin wrapper in _hooks
navigate('FilteredShop', { category, subtitle: t(label) });
```

## Key rules

- **Typed navigation props always**: `TMainNavigationProp<'Shop'>` / `TRootStackNavigationProp<'Search'>` / `TRootStackRouteProp<'Search'>` — never untyped `any` navigation. Non-parameterized `TMainNavigationProp`/`TRootStackNavigationProp` is allowed when any route works.
- `TMainParamsList` is declared in `TRootStackParamList.ts` (not in `MainNavigator.tsx`) to avoid a circular dependency — keep it there.
- **`push` vs `navigate`**: `push` stacks a new instance (list → detail); `navigate` reuses an existing entry (filters → search). `navigation.pop()` to close modals/search.
- Route params carry display fallbacks: pass the tapped `reward` object so the detail screen renders before the fetch resolves.
- Tab screens get `headerShown: false` (tab bar + custom headers per route via `useMainHeaderProps`); stacked screens own their native header.
- Header titles translated with direct `i18n.t(...)` (outside React render); in-component strings use `useTranslation().t`.
- Deep-link/flow gating is data-driven: the navigator conditionally renders groups based on `useAuthentication`, `useOnboarding`, `useGetVersions`, and `passHolder` presence.
- New route keys go into `TRootStackParamList` alphabetically; the file also defines `TRootRoute`, `TMainRoute`, `TRoute` unions — extend unions, don't bypass them.
