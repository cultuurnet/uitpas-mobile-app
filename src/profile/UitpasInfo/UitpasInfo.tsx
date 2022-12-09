import React, { FC } from 'react';

import i18n from '../../_translations/i18n';
import * as Styled from './style';

type TProps = {
  onClose?: () => void;
};

const UitpasInfo: FC<TProps> = ({ onClose }) => {
  return (
    <Styled.NotificationContainer>
      <Styled.CardInfo color="secondary.900">{i18n.t('PROFILE.INFO')}</Styled.CardInfo>
      <Styled.CloseButton name="Close" onPress={onClose} size={10} />
    </Styled.NotificationContainer>
  );
};

export default UitpasInfo;
