import React, { FC, PropsWithChildren } from 'react';
import { Modal } from 'react-native';

import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  onDismiss?: () => void;
  toggleIsVisible: () => void;
};

const BlurredModal: FC<PropsWithChildren<TLogOutModalProps>> = ({ isVisible, toggleIsVisible, onDismiss, children }) => {
  return (
    <Modal animationType="fade" onDismiss={onDismiss} onRequestClose={toggleIsVisible} transparent visible={isVisible}>
      <Styled.BlurContainer onPress={toggleIsVisible}>
        <Styled.ModalContainer>{children}</Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default BlurredModal;
