import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from '../icon/Icon'
import Typography from '../typography/Typography'
import { InAppRewardContainer, OnlineIconContainer } from './style'

type TProps = {
  withLabel?: boolean;
};

export const InAppRewardLabel = ({ withLabel = true }: TProps) => {
  const { t } = useTranslation();

  return (
    <InAppRewardContainer>
      <OnlineIconContainer><Icon name="Online" size={12} /></OnlineIconContainer>
      {withLabel && <Typography color="primary.800" size="small">{t("SHOP.ONLINE_REWARD")}</Typography>}
    </InAppRewardContainer>
  )
}
