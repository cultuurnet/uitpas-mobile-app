import React, { FC, useEffect } from 'react';
import { Modal, StatusBar } from 'react-native';

import { Icon } from '../../../_components';
import { useFullScreenBrightness } from '../../../_hooks/useFullscreenBrightness';
import { theme } from '../../../_styles/theme';
import { TPassHolder } from '../../_models';
import UitpasCard from '../UitpasCard/UitpasCard';
import * as Styled from './style';

type TCardModalProps = {
  isVisible: boolean;
  passHolder: TPassHolder;
  toggleIsVisible: () => void;
};

const CardModal: FC<TCardModalProps> = ({ passHolder, isVisible, toggleIsVisible }) => {
  const { resetScreen, brightenScreen } = useFullScreenBrightness();

  useEffect(() => {
    isVisible ? brightenScreen() : resetScreen();
  }, [isVisible, brightenScreen, resetScreen]);

  return (
    <Modal
      animationType="fade"
      onRequestClose={toggleIsVisible}
      presentationStyle="overFullScreen"
      transparent
      visible={isVisible}
    >
      {isVisible && <StatusBar backgroundColor={theme.palette.neutral['900']} barStyle="light-content" />}
      <Styled.BlurContainer onPress={toggleIsVisible} underlayColor="rgba(0, 0, 0, 0.85)">
        <>
          <Styled.CloseButton>
            <Icon color="neutral.0" name="Close" onPress={toggleIsVisible} size={14} />
          </Styled.CloseButton>
          <UitpasCard isLarge passHolder={passHolder} />
        </>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default CardModal;
