import React, { FC, useEffect } from 'react';
import { Modal } from 'react-native';

import { Icon } from '../../../_components';
import { useFullScreenBrightness } from '../../../_hooks/useFullscreenBrightness';
import { theme } from '../../../_styles/theme';
import { TPassHolder } from '../../_models';
import UitpasCard from '../UitpasCard/UitpasCard';
import * as Styled from './style';
import { StatusBar } from 'expo-status-bar';

type TCardModalProps = { icon?: string; isVisible: boolean; passHolder: TPassHolder; toggleIsVisible: () => void };

const CardModal: FC<TCardModalProps> = ({ passHolder, icon, isVisible, toggleIsVisible }) => {
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
      {isVisible && <StatusBar backgroundColor={theme.palette.neutral['900']} style="light" />}
      <Styled.BlurContainer onPress={toggleIsVisible} underlayColor="rgba(0, 0, 0, 0.85)">
        <>
          <Styled.CloseButton>
            <Icon color="neutral.0" name="Close" onPress={toggleIsVisible} size={14} />
          </Styled.CloseButton>
          <UitpasCard icon={icon} isLarge passHolder={passHolder} />
        </>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default CardModal;
