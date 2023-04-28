import React, { FC } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../_components';
import i18n from '../../_translations/i18n';
import { TPassHolder } from '../_models';
import { applyBarcodeMask } from '../_util/mask';
import * as Styled from './style';

type TProps = {
  isLarge?: boolean;
  passHolder: TPassHolder;
};

const UitpasCard: FC<TProps> = ({ passHolder, isLarge }) => {
  const { width } = useWindowDimensions();

  const activeUitpasCards = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.uitpasNumber);
  const [firstActiveCard] = activeUitpasCards;

  return (
    <>
      <Styled.CardContainer>
        <Styled.ContentContainer screenWidth={width}>
          <Styled.UserInfoContainer>
            <View>
              <Typography color="neutral.0" fontStyle="bold">
                {`${passHolder.firstName} ${passHolder.name}`}
              </Typography>
              <Typography color="neutral.0" size="small">
                {isLarge
                  ? activeUitpasCards.map(card => card.cardSystem.name).join(', ')
                  : `${firstActiveCard.cardSystem.name}${activeUitpasCards.length > 1 && ', ...'}`
                }
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
          <Styled.BarcodeContainer isLarge={isLarge}>
            <Barcode format="CODE128" height={isLarge ? 80 : 40} singleBarWidth={isLarge ? 2 : 1.4} value={firstActiveCard.uitpasNumber} />
            <Typography size={isLarge ? 'normal' : 'small'} topSpacing={isLarge ? '8px' : ''}>{applyBarcodeMask(firstActiveCard.uitpasNumber)}</Typography>
          </Styled.BarcodeContainer>
          <Styled.Triangle screenWidth={width} />
          <Styled.BottomCardView />
        </Styled.ContentContainer>
      </Styled.CardContainer>
      {/* <CardModal firstActiveCard={firstActiveCard} isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} /> */}
    </>
  );
};

export default UitpasCard;
