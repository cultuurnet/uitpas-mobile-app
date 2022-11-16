import { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { Theme } from '../../_styles/theme';
import * as Styled from './style';

type TProps = {
  backgroundColor?: keyof Theme['colors'];
  bottomContent?: React.ReactNode;
  lineColor?: keyof Theme['colors'];
  topContent: React.ReactNode;
};

const DiagonalSplitView: FC<TProps> = ({
  topContent,
  bottomContent,
  backgroundColor = 'secondary',
  lineColor = 'secondaryDark',
}) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Styled.TopSafeAreaViewContainer backgroundColor={backgroundColor} edges={['top']} isScrollable={false} />
      <Styled.ViewContainer edges={['bottom']} isScrollable={false}>
        <Styled.TopContainer backgroundColor={backgroundColor}>{topContent}</Styled.TopContainer>

        <Styled.DiagonalContainer lineColor={lineColor}>
          <Styled.Triangle backgroundColor={backgroundColor} screenWidth={width} />
          <Styled.TriangleDark screenWidth={width} />
        </Styled.DiagonalContainer>

        <Styled.BottomContainer>{bottomContent}</Styled.BottomContainer>
      </Styled.ViewContainer>
    </>
  );
};

export default DiagonalSplitView;
