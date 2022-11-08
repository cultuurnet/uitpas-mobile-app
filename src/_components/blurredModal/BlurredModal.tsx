import React, { FC, PropsWithChildren } from 'react';
import { Modal } from 'react-native';

import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  toggleIsVisible: (nextValue?: unknown) => void;
};

const BlurredModal: FC<PropsWithChildren<TLogOutModalProps>> = ({ isVisible, toggleIsVisible, children }) => {
  return (
    <Modal onRequestClose={() => toggleIsVisible()} transparent visible={isVisible}>
      <Styled.BlurContainer>
        <Styled.ModalContainer>{children}</Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default BlurredModal;
