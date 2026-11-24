import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Modal, Platform } from 'react-native';

import * as Styled from './style';

// RN only supports `Modal.onDismiss` on iOS, so Android needs a synthetic dismissal.
// The fade-out uses `@android:integer/config_shortAnimTime` (200 ms); 300 ms adds a margin.
const ANDROID_DISMISS_DELAY_MS = 300;

type TLogOutModalProps = {
  isVisible: boolean;
  onDismiss?: () => void;
  toggleIsVisible: () => void;
};

const BlurredModal: FC<PropsWithChildren<TLogOutModalProps>> = ({ isVisible, toggleIsVisible, onDismiss, children }) => {
  const hasBeenShownRef = useRef(false);

  useEffect(() => {
    if (isVisible) {
      hasBeenShownRef.current = true;
      return;
    }
    if (Platform.OS === 'ios') return;
    if (!hasBeenShownRef.current) return;

    const timeout = setTimeout(() => {
      hasBeenShownRef.current = false;
      onDismiss?.();
    }, ANDROID_DISMISS_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [isVisible, onDismiss]);

  return (
    <Modal animationType="fade" onDismiss={onDismiss} onRequestClose={toggleIsVisible} transparent visible={isVisible}>
      <Styled.BlurContainer accessible={false} importantForAccessibility="no" onPress={toggleIsVisible}>
        <Styled.ModalContainer accessibilityViewIsModal>{children}</Styled.ModalContainer>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default BlurredModal;
