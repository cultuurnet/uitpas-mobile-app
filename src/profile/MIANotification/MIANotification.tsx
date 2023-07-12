import React, { FC } from 'react';

import i18n from '../../_translations/i18n';
import { formatDate } from '../../_utils';
import { TCardSystemMembership } from '../_models';
import * as Styled from './style';

type TProps = {
  socialTariffInfo: TCardSystemMembership['socialTariff'];
};

const MIANotification: FC<TProps> = ({ socialTariffInfo }) => {
  return (
    <Styled.NotificationContainer>
      <Styled.CloseButton name="SocialTariff" size={25} />
      <Styled.MIAText color="secondary.900">{i18n.t('PROFILE.MIA')}</Styled.MIAText>
      {socialTariffInfo.endDate && (
        <Styled.ExpirationText color="secondary.900" size="small">{`${i18n.t('PROFILE.VALID_UNTIL')} ${formatDate(
          new Date(socialTariffInfo.endDate),
        )}`}</Styled.ExpirationText>
      )}
    </Styled.NotificationContainer>
  );
};

export default MIANotification;
