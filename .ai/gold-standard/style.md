# Style (styled-components + theme)

Source of truth: `src/shopDetail/style.ts`, `src/shopDetail/_components/*/style.ts`, `src/shop/style.ts`, shared: `src/_styles/theme.ts`, `src/_components/typography/style.ts`, `src/_components/button/style.ts`.

Location: one `style.ts` next to every `.tsx`. Import: `import * as Styled from './style'` (exception: `src/shop/_components/categoryFilters/style.ts` uses `import Styled from 'styled-components/native'` and names elements directly — outlier, don't copy).

## Skeleton

```ts
import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

import { Typography } from '../../_components';          // extend shared components
import { theme } from '../../_styles/theme';             // static theme values

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.neutral[0]};
`;

// Extend a shared component to inherit its props (Typography props keep working)
export const Title = styled(Typography)`
  line-height: 28px;
`;

// Type-driven props: define inline or Pick from the component's TProps
export const Button = styled(ButtonComponent)<{ isLast: boolean }>`
  border-bottom-color: ${({ theme, isLast }) => (isLast ? 'transparent' : theme.palette.neutral['200'])};
  margin-right: ${({ isLast }) => (isLast ? '0' : '16px')};
`;

// Re-exported constants used by both style and component
export const TileMargin = 16;

// Plain objects for list contentContainerStyle etc.
export const ContentContainerStyle = { paddingLeft: TileMargin };
```

## Key rules

- **`import styled from 'styled-components/native'`** always (never `styled-components` — ESLint enforced). Wrap third-party components with aliased imports: `import { Image as ExpoImage } from 'expo-image'` then `styled(ExpoImage)`.
- **Colors/spacing only from `theme`**: `theme.palette.{primary|secondary|neutral|error}['0'..'1200']` (string keys in quotes, ESLint sorts them), `theme.common.defaultSpacing` (16), `theme.common.borderRadius`, `theme.common.spacingVertical`. Numeric literals allowed for layout dimensions (widths, radii, margins) but never for palette colors. Never use the deprecated `theme.colors` map.
- **Static access imports `theme`, dynamic uses the prop**: interpolations that don't depend on props use the imported `theme` object; prop-dependent styles use `({ theme, ...props }) => ...` destructuring. Both forms coexist in the same file.
- **Component extensions over wrappers**: prefer `styled(Typography)`, `styled(Button)`, `styled(PressableOpacity)` for small prop adjustments (margin, line-height, color) instead of wrapping in a `View`; new RN elements are `styled.View` / `styled.Text` / `styled.TextInput` / `styled.KeyboardAvoidingView`.
- **Prop types inline**: `styled(X)<{ showTopBorder }>`, untyped destructure acceptable for boolean flags (`${({ showTopBorder }) => ...}`); stricter files use `Pick<TButtonProps, ...>` with `$`-prefixed transient props (`$active`, `$variant` — see `Button.tsx`/`style.ts` for the transient-prop convention).
- One named export per layout part; names descriptive of role (`Container`, `Header`, `SectionTitle`, `RewardTile`), not of CSS (`MarginBox`).
- Props used only for styling (e.g. `showTopBorder`) don't need to reach the component logic — consume them inside `style.ts` only.
- Shadows: `elevation` for Android + `shadow-*` block for iOS side by side (`featuredReward/style.ts` Badge).
- Gradient fades: `styled(LinearGradient)` with `pointerEvents="none"` overlay at container edges (`categoryFilters`).
