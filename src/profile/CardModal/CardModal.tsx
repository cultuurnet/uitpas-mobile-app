import React, { FC } from 'react';
import { Modal, View } from 'react-native';
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
  useFullScreenBrightness();

  return (
    <Modal
      animationType="fade"
      onRequestClose={toggleIsVisible}
      presentationStyle="overFullScreen"
      transparent
      visible={isVisible}
    >
      <Styled.BlurContainer onPress={toggleIsVisible}>
        <Styled.ModalContainer>
          <View style={{ alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <BrandLogo height={40} inverse />
          </View>
          <View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 30 }}>
            <Barcode format="CODE128" height={100} singleBarWidth={2} value={firstActiveCard.uitpasNumber} />
            <Typography fontStyle="semibold" size="large" topSpacing="10px">
              {applyBarcodeMask(firstActiveCard.uitpasNumber)}
            </Typography>
          </View>
        </Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default CardModal;
