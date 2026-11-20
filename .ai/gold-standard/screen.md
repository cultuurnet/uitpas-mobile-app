# Screen (feature root component)

Source of truth: `src/shopDetail/ShopDetail.tsx`, `src/shop/Shop.tsx`, `src/shop/search/Search.tsx`, `src/shop/searchFilters/SearchFilters.tsx`.

## Skeleton

```tsx
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Analytics, Typography } from '../_components';          // shared barrel
import { useTracking } from '../_context';
import { TMainNavigationProp, TRootStackRouteProp } from '../_routing';
import { useGetXFromOtherFeature } from '../otherFeature/_queries';
import { useGetThing } from './_queries/useGetThing';
import { LocalComponent } from './_components/localComponent/LocalComponent';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'{MainRoute}'>;   // tab screens
  route: TRootStackRouteProp<'{RootRoute}'>;        // stacked screens
};

export const {ScreenName} = ({ navigation, route }: TProps) => {
  // 1. route params (+ defaults)
  const { id, someFlag = true } = route.params;
  // 2. queries first, then local state
  const { data: me } = useGetMe();
  const { data, isLoading, error, refetch } = useGetThing({ id });
  const [value, setValue] = useState<TType>();
  const [isVisible, toggleIsVisible] = useToggle(false);          // modal booleans via useToggle
  const { t } = useTranslation();
  const { trackSelfDescribingEvent } = useTracking();

  // 3. memoized derived data, then useCallback handlers (handleX naming)
  const derived = useMemo(() => ..., [data]);
  const handlePress = useCallback(() => {
    trackSelfDescribingEvent('buttonClick', { button_name: '{event-name}' }, {TrackingContext});
  }, [deps]);

  return (
    <>
      <Analytics data={{TrackingContext}} screenName="{screen_name}" />
      <ScrollView>
        <Styled.{LayoutPart}>
          <Typography fontStyle="bold" size="xxlarge">{data.title}</Typography>
        </Styled.{LayoutPart}>
        <LocalComponent onAction={handlePress} thing={data} />
      </ScrollView>
      <{SomeModal} isVisible={isVisible} toggleIsVisible={handleClose} />
    </>
  );
};
```

## Key rules

- **Export**: screens may be a named export (`ShopDetail`, `Search`, `SearchFilters`) or default export (`Shop`) — both exist; navigation imports adapt. New screens: named export is the dominant style in newer code.
- **Props**: `type TProps = { navigation: ...; route: ... }`. Tab screens take `TMainNavigationProp<'{TabName}'>` only; stacked screens take both `navigation` and `route`. Components inside the tree use `useNavigation<T...Prop>()` from `@react-navigation/native` instead of prop drilling.
- **Data**: every screen fetches via `_queries` hooks. Paginated data is flattened with `data?.pages?.flatMap(...) ?? []` (see `Search.tsx`); list screens render `<FlatList>` / `<FlashList>` with `keyExtractor={item => item.id}`.
- **Fallback pattern**: `const reward = data || fallbackReward;` — cached list item passed as route param renders instantly, query refreshes in background (`ShopDetail.tsx`).
- **Analytics**: `<Analytics screenName="..." />` first child of the fragment; tracking calls via `useTracking().trackSelfDescribingEvent`, wrapped in `useCallback` with exact dependency list; event payloads built by helpers from `_utils` (`getRewardTrackingData`).
- **Conditional rendering**: return `null` early when data absent (`if (!isVisible) return null;` — `Availability.tsx`); JSX conditions use `!!` coercion (`{!!reward.points && ...}`).
- **i18n**: `const { t } = useTranslation()`; keys `FEATURE.SUB_KEY` UPPER_SNAKE; `t` calls inline in JSX, interpolation `{ t('X.Y', { count }) }`.
- **Modals** live in feature `_components`, controlled with `useToggle`, rendered at screen bottom with `isVisible` + `toggleIsVisible` props.
- **Ref sections**: `stickyHeaderIndices` computed via `useMemo` from state (`ShopDetail.tsx`); measured via `ref.current?.measureLayout(...)`.
- **Platform branches**: `Platform.OS === 'ios' ? ... : ...` inline (never separate components); safe areas via `useSafeAreaInsets()`.
- **Styling**: zero inline style objects except 1-off numeric tweaks; layout pieces are `Styled.X` from `./style`.
- Local module-level constant arrays (`SECTIONS`, `SEARCH_TERMS`, `CATEGORIES`) live above the component with `SCREAMING_SNAKE` names.
