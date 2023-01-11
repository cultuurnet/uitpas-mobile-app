import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../_components';
import { useFullScreenBrightness } from '../../_hooks/useFullscreenBrightness';
import { TCardSystemMembership } from '../_models';
import { applyBarcodeMask } from '../_util/mask';
import * as Styled from './style';

type TCardModalProps = {
  firstActiveCard: TCardSystemMembership;
  isVisible: boolean;
  toggleIsVisible: () => void;
};

const CardModal: FC<TCardModalProps> = ({ isVisible, toggleIsVisible, firstActiveCard }) => {
  const { resetScreen, brightenScreen } = useFullScreenBrightness();
  useEffect(() => {
    isVisible ? brightenScreen() : resetScreen();
  }, [isVisible]);

  return (
    <Modal
      animationType="fade"
      onRequestClose={toggleIsVisible}
      presentationStyle="overFullScreen"
      transparent
      visible={isVisible}
    >
      <Styled.BlurContainer onPress={toggleIsVisible} underlayColor="rgba(0, 0, 0, 0.85)">
        <Styled.ModalContainer>
          <Styled.CloseButton color="neutral.0" name="Close" onPress={toggleIsVisible} size={15} />
          <Styled.LogoContainer>
            <BrandLogo height={40} inverse />
          </Styled.LogoContainer>
          <Styled.BarcodeContainer>
            <Barcode format="CODE128" height={100} singleBarWidth={2} value={firstActiveCard.uitpasNumber} />
            <Typography fontStyle="semibold" size="large" topSpacing="10px">
              {applyBarcodeMask(firstActiveCard.uitpasNumber)}
            </Typography>
          </Styled.BarcodeContainer>
        </Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default CardModal;
