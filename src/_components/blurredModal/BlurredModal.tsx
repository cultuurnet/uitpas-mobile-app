import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Modal, Platform } from 'react-native';

import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  onDismiss?: () => void;
  toggleIsVisible: () => void;
};

const BlurredModal: FC<PropsWithChildren<TLogOutModalProps>> = ({ isVisible, toggleIsVisible, onDismiss, children }) => {
  useEffect(() => {
    if (isVisible) return;
    if (Platform.OS === 'ios') return;

    onDismiss?.();
  }, [isVisible, onDismiss]);

  return (
    <Modal animationType="fade" onDismiss={onDismiss} onRequestClose={toggleIsVisible} transparent visible={isVisible}>
      <Styled.BlurContainer onPress={toggleIsVisible}>
        <Styled.ModalContainer>{children}</Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default BlurredModal;
