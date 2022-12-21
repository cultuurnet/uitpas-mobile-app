import React, { FC, PropsWithChildren } from 'react';
import { Modal } from 'react-native';

import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  toggleIsVisible: () => void;
};

const BlurredModal: FC<PropsWithChildren<TLogOutModalProps>> = ({ isVisible, toggleIsVisible, children }) => {
  return (
    <Modal animationType="fade" onRequestClose={toggleIsVisible} transparent visible={isVisible}>
      <Styled.BlurContainer onPress={toggleIsVisible}>
        <Styled.ModalContainer>{children}</Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default BlurredModal;
