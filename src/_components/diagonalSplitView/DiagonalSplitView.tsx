import { FC, useEffect } from 'react';
import { ScrollView, StatusBar, useWindowDimensions, View } from 'react-native';

import { Theme, theme } from '../../_styles/theme';
import * as Styled from './style';

type TProps = {
  backgroundColor?: keyof Theme['colors'];
  bottomContent?: React.ReactNode;
  isScrollable?: boolean;
  lineColor?: keyof Theme['colors'];
  topContent: React.ReactNode;
};

const DiagonalSplitView: FC<TProps> = ({
  topContent,
  bottomContent,
  backgroundColor = 'secondary',
  lineColor = 'secondaryDark',
  isScrollable,
}) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors[backgroundColor]);
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <>
      <Styled.TopSafeAreaViewContainer backgroundColor={backgroundColor} edges={['top']} isScrollable={false} />
      <Styled.ViewContainer edges={['bottom']} isScrollable={false}>
        <Styled.TopContainer backgroundColor={backgroundColor}>{topContent}</Styled.TopContainer>

        <Styled.DiagonalContainer lineColor={lineColor}>
          <Styled.Triangle backgroundColor={backgroundColor} screenWidth={width} />
          <Styled.TriangleDark screenWidth={width} />
        </Styled.DiagonalContainer>

        <Styled.BottomContainer as={isScrollable ? ScrollView : View}>
          {isScrollable ? <Styled.BottomContainerContent>{bottomContent}</Styled.BottomContainerContent> : bottomContent}
        </Styled.BottomContainer>
      </Styled.ViewContainer>
    </>
  );
};

export default DiagonalSplitView;
