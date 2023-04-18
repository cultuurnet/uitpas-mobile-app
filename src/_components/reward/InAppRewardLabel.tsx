import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from '../icon/Icon'
import Typography from '../typography/Typography'
import * as Styled from './style'

type TProps = {
  hideLabel?: boolean;
  large?: boolean;
};

export const InAppRewardLabel = ({ large = false, hideLabel = false, ...props }: TProps) => {
  const { t } = useTranslation();

  return (
    <Styled.InAppRewardContainer {...props}>
      <Styled.OnlineIconContainer large={large}><Icon name="Online" size={large ? 22 : 12} /></Styled.OnlineIconContainer>
      {!hideLabel && <Typography color="primary.800" size={large ? 'normal' : "small"}>{t("SHOP.ONLINE_REWARD")}</Typography>}
    </Styled.InAppRewardContainer>
  )
}
