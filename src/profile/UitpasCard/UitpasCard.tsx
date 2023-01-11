import React, { FC } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../_components';
import { useToggle } from '../../_hooks';
import { theme } from '../../_styles/theme';
import i18n from '../../_translations/i18n';
import { TPassHolder } from '../_models';
import { applyBarcodeMask } from '../_util/mask';
import CardModal from '../CardModal/CardModal';
import * as Styled from './style';

type TProps = {
  passHolder: TPassHolder;
};

const UitpasCard: FC<TProps> = ({ passHolder }) => {
  const { width } = useWindowDimensions();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const activeUitpasCards = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.uitpasNumber);
  const [firstActiveCard] = activeUitpasCards;

  return (
    <>
      <Styled.CardContainer>
        <Styled.ContentContainer>
          <Styled.UserInfoContainer>
            <View>
              <Typography color="neutral.0" fontStyle="bold">
                {`${passHolder.firstName} ${passHolder.name}`}
              </Typography>
              <Typography color="neutral.0" size="small">
                {firstActiveCard.cardSystem.name}
                {activeUitpasCards.length > 1 && ', ...'}
              </Typography>
            </View>
            <Styled.PointsView>
              <Typography color="neutral.0" fontStyle="bold" size="xlarge">
                {passHolder.points}
              </Typography>
              <Typography color="neutral.0" fontStyle="semibold" size="xsmall">
                {i18n.t('PROFILE.POINTS')}
              </Typography>
            </Styled.PointsView>
          </Styled.UserInfoContainer>
          <Styled.LogoContainer>
            <BrandLogo height={16} inverse />
          </Styled.LogoContainer>
          <Styled.BarcodeContainer onPress={toggleCardModalVisible} underlayColor={theme.palette.neutral['100']}>
            <>
              <Barcode format="CODE128" height={40} singleBarWidth={1.4} value={firstActiveCard.uitpasNumber} />
              <Typography>{applyBarcodeMask(firstActiveCard.uitpasNumber)}</Typography>
            </>
          </Styled.BarcodeContainer>
        </Styled.ContentContainer>
        <Styled.TopCardView screenWidth={width}>
          <Styled.Triangle screenWidth={width} />
        </Styled.TopCardView>
        <Styled.BottomCardView screenWidth={width} />
      </Styled.CardContainer>
      <CardModal firstActiveCard={firstActiveCard} isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} />
    </>
  );
};

export default UitpasCard;
