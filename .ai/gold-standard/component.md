# Component (feature-local)

Source of truth: `src/shopDetail/_components/*`, cross-checked with `src/shop/_components/*` and `src/shop/search/*`.

Location: `<feature>/_components/<camelName>/<PascalName>.tsx` + sibling `<camelName>/style.ts`. Nested sub-components get a nested folder (`redeemFamilyMembers/redeemFamilyButton/`).

## Skeleton

```tsx
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '../../../_components';        // depth = folder nesting level
import { useToggle } from '../../../_hooks';
import { TModelFromOtherFeature } from '../../../otherFeature/_models';
import { useGetThing } from '../../_queries/useGetThing';         // feature queries via ../
import { TLocalModel } from '../../_models/localModel';
import { SubComponent } from '../subComponent/SubComponent';
import * as Styled from './style';

type TProps = {
  // required first, optional last, alphabetical order (enforced by typescript-sort-keys)
  thing: TLocalModel;
  onAction: (thing: TLocalModel) => void;
  fallbackName?: string;
  showBorder?: boolean;
};

export const {ComponentName} = memo(({ thing, onAction, fallbackName, showBorder = false }: TProps) => {
  const { t } = useTranslation();

  const derived = useMemo(() => ..., [thing]);
  const handlePress = useCallback(() => onAction(thing), [onAction, thing]);

  // early returns: loading state first, then null, then content
  if (isLoading) return <SkeletonLoader layout={[{ height: 14, key: `{component}-${thing.id}-text`, width: 200 }]} />;
  if (!visible) return null;

  return (
    <Styled.Container activeOpacity={0.8} onPress={handlePress}>
      <Typography fontStyle="bold">{thing.title}</Typography>
    </Styled.Container>
  );
});
```

## Variations (all observed in source)

- **Forwarding refs**: `export const RedeemStatusButton = forwardRef<View, TProps>((props, ref) => ...)` when a parent measures the element (`RedeemStatusButton.tsx`).
- **Memo wrapper**: `memo(...)` on pure list-item components (`Section`, `Organizer`, `RedeemFamilyMembers`, `Availability`); not on modal/stateful ones.
- **FC typing**: `const X: FC<TProps> = ...` + `export default X` for modal components (`RedeemModal.tsx`, `RegionNotification.tsx`); named-export arrow for the rest. Default export used when the component is exported via a barrel elsewhere.
- **File-scoped prop types**: prop type may be named `TProps` or `T{Component}Props` (`TRedeemModalProps`); local item types (`TFamilyMemberItem`) sit below `TProps`.
- **Own queries**: components may fetch with feature `_queries` hooks directly (`Organizer` → `useGetOrganizer`, `RedeemFamilyButton` → `useGetRedeemStatus`).
- **Loading components**: dedicated `<Component>.loading.tsx` file (`RewardSection.loading.tsx` exporting `RewardsSectionLoader`) when the loading state is substantial; simple inline `SkeletonLoader` otherwise.
- **Modal components**: render `<BlurredModal isVisible={...} toggleIsVisible={...}>` with `Typography` title + `Trans` description + `Button` row; dismiss handled by parent (`RedeemModal.tsx`).
- **Callback props**: named `onX` (`onPress`, `onRedeem`, `onAction`); parent keeps handler in `useCallback`.
- **Error display**: localized message from `TApiError.endUserMessage[getLanguage()]` with `t('...GENERIC_ERROR')` fallback (`RedeemStatusError.tsx`).

## Key rules

- Never edit `_components` (shared) to serve one feature — add feature-local `_components` instead; promote to shared only when a second feature needs it.
- Cross-feature reuse goes through the other feature's `_components` path directly (`shopDetail` imports `shop/_components/rewardsSection/RewardsSection`) — acceptable, but only via the component file, never its `style.ts` internals. Exception: `styled(RewardsSection)` wrappers do import the component (see style.md).
- `style.ts` exports one styled component per layout part; import as `import * as Styled from './style'` and use as `Styled.Container`. Constants used by styles (e.g. `RewardTileMargin`) are exported from `style.ts` too.
- Props alphabetical (ESLint `typescript-sort-keys`); destructured with defaults inline (`showTopBorder = false`).
- `key` extraction: `key={item.id}` or stable string keys for `SkeletonLoader layout` entries (`organizer-${id}-text-1`).
- No `console` — use `log` from `_utils` if needed (rarely in components).
- Tracking calls inside components follow the same `trackSelfDescribingEvent(event, payload, context)` shape as screens.
