import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from '../icon/Icon'
import Typography from '../typography/Typography'
import * as Styled from './style'

type TProps = {
  hideLabel?: boolean;
};

export const InAppRewardLabel = ({ hideLabel = false }: TProps) => {
  const { t } = useTranslation();

  return (
    <Styled.InAppRewardContainer>
      <Styled.OnlineIconContainer><Icon name="Online" size={12} /></Styled.OnlineIconContainer>
      {!hideLabel && <Typography color="primary.800" size="small">{t("SHOP.ONLINE_REWARD")}</Typography>}
    </Styled.InAppRewardContainer>
  )
}
