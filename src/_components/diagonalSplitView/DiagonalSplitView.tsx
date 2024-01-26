import { FC } from 'react';
import { ScrollView, StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils';
import FocusAwareStatusBar from '../statusBar/FocusAwareStatusBar';
import * as Styled from './style';

type TProps = {
  backgroundColor?: ThemeColor;
  bottomContent?: React.ReactNode;
  bottomContentStyle?: StyleProp<ViewStyle>;
  diagonalContainerHeight?: number;
  isScrollable?: boolean;
  lineColor?: ThemeColor;
  topContent: React.ReactNode;
  topContentStyle?: StyleProp<ViewStyle>;
};

const DiagonalSplitView: FC<TProps> = ({
  topContent,
  bottomContent,
  topContentStyle,
  bottomContentStyle,
  backgroundColor = 'secondary.600',
  lineColor = 'secondary.700',
  isScrollable,
  diagonalContainerHeight = 100,
}) => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <Styled.TopSafeAreaViewContainer backgroundColor={backgroundColor} edges={['top']} isScrollable={false} />
      <Styled.ViewContainer backgroundColor={backgroundColor} edges={['bottom']} isScrollable={false}>
        <Styled.TopContainer backgroundColor={backgroundColor} style={topContentStyle}>
          {topContent}
        </Styled.TopContainer>

        <Styled.DiagonalContainer diagonalContainerHeight={diagonalContainerHeight} lineColor={lineColor}>
          <Styled.Triangle
            backgroundColor={backgroundColor}
            diagonalContainerHeight={diagonalContainerHeight}
            screenWidth={width}
          />
          <Styled.TriangleDark diagonalContainerHeight={diagonalContainerHeight} screenWidth={width} />
        </Styled.DiagonalContainer>

        <Styled.BottomContainer as={isScrollable ? ScrollView : View} style={bottomContentStyle}>
          {isScrollable ? <Styled.BottomContainerContent>{bottomContent}</Styled.BottomContainerContent> : bottomContent}
        </Styled.BottomContainer>
      </Styled.ViewContainer>
      <FocusAwareStatusBar backgroundColor={getColor(backgroundColor)} barStyle="light-content" />
    </ScrollView>
  );
};

export default DiagonalSplitView;
