import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';

import { Button, Icon, Spinner, Typography } from '../../_components';
import { ConfigUrl } from '../../_config';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import * as Styled from './style';

type TProps = {
  config: ReturnType<typeof useOverlayDimensions>;
  isLoading?: boolean;
  settings: TOverlayDimensions;
};

const CameraOverlay: FC<TProps> = ({
  config: { sideLength, boundingBox, corners },
  settings: { padding, strokeWidth },
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <Mask id="cutout">
            <Rect fill="#fff" height={height} width="100%" x={0} y={0} />
            <Rect fill="#000" height={sideLength} width={sideLength} x={padding} y={boundingBox.top} />
          </Mask>
        </Defs>
        <Rect
          fill="black"
          fillOpacity={0.4}
          height="100%"
          mask={isLoading ? undefined : 'url(#cutout)'}
          width="100%"
          x={0}
          y={0}
        />

        {!isLoading &&
          corners.map((corner, i) => (
            <Path d={corner.path} key={`corner-${i}`} stroke="white" strokeWidth={strokeWidth} x={corner.x} y={corner.y} />
          ))}
      </Svg>

      <Styled.Instruction bottom={boundingBox.top + sideLength}>
        <Typography align="center" bottomSpacing="20px" color="neutral.0" fontStyle="bold" size="large">
          {t('SCAN.CAMERA.DESCRIPTION')}
        </Typography>
        {height > 720 && <Icon name="QRInstruction" size={80} />}
      </Styled.Instruction>

      <Styled.Instruction top={boundingBox.bottom}>
        <Button centered href={ConfigUrl.scanHelp} inline label={t('SCAN.CAMERA.CTA')} variant="outline" />
      </Styled.Instruction>

      {isLoading && (
        <View style={StyleSheet.absoluteFill}>
          <Spinner color="neutral.0" />
        </View>
      )}
    </>
  );
};

export default CameraOverlay;
