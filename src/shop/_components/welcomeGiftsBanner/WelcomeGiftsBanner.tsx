import React from 'react'
import { useTranslation } from 'react-i18next'

import { GiftHalf } from '../../../_assets/images'
import { Icon } from '../../../_components'
import { theme } from '../../../_styles/theme'
import { useGetMe } from '../../../profile/_queries/useGetMe'
import * as Styled from './style';

export const WelcomeGiftsBanner = () => {
  const { t } = useTranslation();
  const { data: user } = useGetMe();

  // TODO: condition whemn to show and when not
  // if(user.creationDate)  return null;

  return (
    <Styled.Container onPress={() => { }} underlayColor={theme.palette.primary[800]}>
      <>
        <Styled.Gift source={GiftHalf} />
        <Styled.TextContainer>
          <Styled.Greeting color="neutral.0" size="small">{t('SHOP.WELCOME.GREETING', { name: user.firstName })}</Styled.Greeting>
          <Styled.Title color="neutral.0" fontStyle='bold' size="xxlarge">{t('SHOP.WELCOME.TITLE')}</Styled.Title>
        </Styled.TextContainer>
        <Styled.ArrowContainer>
          <Icon color={'neutral.0'} name="ArrowRight" size={24} />
        </Styled.ArrowContainer>
      </>
    </Styled.Container>
  )
}
