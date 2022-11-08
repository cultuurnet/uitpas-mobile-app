import { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import * as Styled from './style';

type TProps = {
  bottomContent?: React.ReactNode;
  topContent: React.ReactNode;
};

const DiagonalSplitView: FC<TProps> = ({ topContent, bottomContent }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Styled.TopSafeAreaViewContainer edges={['top']} isScrollable={false} />
      <Styled.ViewContainer edges={['bottom']} isScrollable={false}>
        <Styled.TopContainer>{topContent}</Styled.TopContainer>

        <Styled.DiagonalContainer>
          <Styled.Triangle screenWidth={width} />
          <Styled.TriangleDark screenWidth={width} />
        </Styled.DiagonalContainer>

        <Styled.BottomContainer>{bottomContent}</Styled.BottomContainer>
      </Styled.ViewContainer>
    </>
  );
};

export default DiagonalSplitView;
