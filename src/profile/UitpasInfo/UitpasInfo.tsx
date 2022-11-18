import React, { FC } from 'react';

import * as Styled from './style';

type TProps = {
  onClose?: () => void;
};

const UitpasInfo: FC<TProps> = ({ onClose }) => {
  return (
    <Styled.NotificationContainer>
      <Styled.CardInfo color="darkGreen">
        Dit is je digitale UiTPAS. Toon deze barcode wanneer je een voordeel wenst om te ruilen op een UiTPAS locatie.
      </Styled.CardInfo>
      <Styled.CloseButton name="Close" onPress={onClose} size={10} />
    </Styled.NotificationContainer>
  );
};

export default UitpasInfo;
