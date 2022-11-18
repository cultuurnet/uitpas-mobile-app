import React, { FC } from 'react';

import { TCardSystemMembership } from '../_models';
import * as Styled from './style';

type TProps = {
  socialTariffInfo: TCardSystemMembership['socialTariff'];
};

const MIANotification: FC<TProps> = ({ socialTariffInfo }) => {
  return (
    <Styled.NotificationContainer>
      <Styled.CloseButton name="KansenTarief" size={25} />
      <Styled.MIAText color="darkGreen">
        Dankzij jouw UiTPAS met kortingstarief kan je extra voordelig deelnemen aan UiTPAS-activiteiten.
      </Styled.MIAText>
      <Styled.ExpirationText color="darkGreen" size="small">{`Geldig tot ${socialTariffInfo?.expired}`}</Styled.ExpirationText>
    </Styled.NotificationContainer>
  );
};

export default MIANotification;
