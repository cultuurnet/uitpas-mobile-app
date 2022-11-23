import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Defs, Mask, Path, Rect } from 'react-native-svg';

import { Button, Icon, Typography } from '../../_components';
import { ConfigUrl } from '../../_config';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import * as Styled from './style';

type TProps = {
  config: ReturnType<typeof useOverlayDimensions>;
  settings: TOverlayDimensions;
};

const CameraOverlay: FC<TProps> = ({ config: { sideLength, boundingBox, corners }, settings: { padding, strokeWidth } }) => {
  const { t } = useTranslation();

  return (
    <>
      <Styled.Overlay>
        <Defs>
          <Mask id="cutout">
            <Rect fill="#fff" height="100%" width="100%" x={0} y={0} />
            <Rect fill="#000" height={sideLength} width={sideLength} x={padding} y={boundingBox.top} />
          </Mask>
        </Defs>
        <Rect fill="black" fillOpacity={0.4} height="100%" mask="url(#cutout)" width="100%" x={0} y={0} />

        {corners.map((corner, i) => (
          <Path d={corner.path} key={`corner-${i}`} stroke="white" strokeWidth={strokeWidth} x={corner.x} y={corner.y} />
        ))}
      </Styled.Overlay>

      <Styled.Instruction bottom={boundingBox.top + sideLength}>
        <Typography align="center" bottomSpacing="20px" color="white" fontStyle="bold" size="large">
          {t('CAMERA.DESCRIPTION')}
        </Typography>
        <Icon name="QRInstruction" size={80} />
      </Styled.Instruction>

      <Styled.Instruction top={boundingBox.bottom}>
        <Button centered href={ConfigUrl.scanHelp} inline label={t('CAMERA.CTA')} variant="outline" />
      </Styled.Instruction>
    </>
  );
};

export default CameraOverlay;
