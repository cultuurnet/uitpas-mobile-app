import { FC } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import FocusAwareStatusBar from '../statusBar/FocusAwareStatusBar';
import * as Styled from './style';

type TProps = {
  backgroundColor?: ThemeColor;
  bottomContent?: React.ReactNode;
  diagonalContainerHeight?: number;
  isScrollable?: boolean;
  lineColor?: ThemeColor;
  topContent: React.ReactNode;
};

const DiagonalSplitView: FC<TProps> = ({
  topContent,
  bottomContent,
  backgroundColor = 'secondary.600',
  lineColor = 'secondary.700',
  isScrollable,
  diagonalContainerHeight = 100,
}) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Styled.TopSafeAreaViewContainer backgroundColor={backgroundColor} edges={['top']} isScrollable={false} />
      <Styled.ViewContainer backgroundColor={backgroundColor} edges={['bottom']} isScrollable={false}>
        <Styled.TopContainer backgroundColor={backgroundColor}>{topContent}</Styled.TopContainer>

        <Styled.DiagonalContainer diagonalContainerHeight={diagonalContainerHeight} lineColor={lineColor}>
          <Styled.Triangle
            backgroundColor={backgroundColor}
            diagonalContainerHeight={diagonalContainerHeight}
            screenWidth={width}
          />
          <Styled.TriangleDark diagonalContainerHeight={diagonalContainerHeight} screenWidth={width} />
        </Styled.DiagonalContainer>

        <Styled.BottomContainer as={isScrollable ? ScrollView : View}>
          {isScrollable ? <Styled.BottomContainerContent>{bottomContent}</Styled.BottomContainerContent> : bottomContent}
        </Styled.BottomContainer>
      </Styled.ViewContainer>
      <FocusAwareStatusBar backgroundColor={getColor(backgroundColor)} barStyle="light-content" />
    </>
  );
};

export default DiagonalSplitView;
