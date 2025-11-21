import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { isBefore, isValid, parseISO, subMonths } from 'date-fns';

import { GiftHalf } from '../../../_assets/images';
import { Icon } from '../../../_components';
import { TMainNavigationProp } from '../../../_routing';
import { theme } from '../../../_styles/theme';
import { useGetMe } from '../../../profile/_queries/useGetMe';
import * as Styled from './style';

export const WelcomeGiftsBanner = () => {
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const { navigate } = useNavigation<TMainNavigationProp>();

  if (!user?.creationDate) return null;
  const creationDate = parseISO(user.creationDate);
  if (!__DEV__ && (!isValid(creationDate) || isBefore(creationDate, subMonths(new Date(), 2)))) return null;

  return (
    <Styled.Container
      onPress={() => navigate('FilteredShop', { section: 'welkom', subtitle: t('SHOP.SECTIONS.WELCOME') })}
      underlayColor={theme.palette.primary[800]}
    >
      <Styled.Gift contentFit="cover" source={GiftHalf} />
      <Styled.TextContainer>
        <Styled.Greeting color="neutral.0" size="small">
          {t('SHOP.WELCOME.GREETING', { name: user?.firstName })}
        </Styled.Greeting>
        <Styled.Title color="neutral.0" fontStyle="bold" size="xxlarge">
          {t('SHOP.WELCOME.TITLE')}
        </Styled.Title>
      </Styled.TextContainer>
      <Styled.ArrowContainer>
        <Icon color={'neutral.0'} name="ArrowRight" size={24} />
      </Styled.ArrowContainer>
    </Styled.Container>
  );
};
