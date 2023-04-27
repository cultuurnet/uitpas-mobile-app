import styled from 'styled-components/native';

// Extra large offset to "counter" the bounce effect of the scrollview
// When you scroll up and see the bounce, there will be no white space between the green header and this green block
const BOUNCE_SCROLLVIEW_FIX = 1000;

export const TopContainerHalf = styled.View<{ height: number }>`
  position: absolute;
  top: -${BOUNCE_SCROLLVIEW_FIX}px;
  right: 0;
  left: 0;
  height: ${({ height }) => BOUNCE_SCROLLVIEW_FIX + height}px;
  background-color: ${({ theme }) => theme.palette.secondary['500']};
`;
