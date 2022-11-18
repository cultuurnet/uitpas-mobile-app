import React, { FC } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../_components';
import { TPassHolder } from '../_models';
import * as Styled from './style';

type TProps = {
  passHolder: TPassHolder;
};

const UitpasCard: FC<TProps> = ({ passHolder }) => {
  const { width } = useWindowDimensions();
  const activeUitpasCards = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE');
  const [firstActiveCard] = activeUitpasCards;

  function renderCards() {
    if (activeUitpasCards.length === 1) {
      return firstActiveCard.cardSystem.name;
    } else {
      return `${firstActiveCard.cardSystem.name}, ...`;
    }
  }

  return (
    <Styled.CardContainer>
      <Styled.ContentContainer>
        <Styled.UserInfoContainer>
          <View>
            <Typography color="white" fontStyle="bold">
              {`${passHolder.firstName} ${passHolder.name}`}
            </Typography>
            <Typography color="white" size="small">
              {renderCards()}
            </Typography>
          </View>
          <View style={{ alignItems: 'center', marginTop: -7 }}>
            <Typography color="white" fontStyle="bold" size="verylarge">
              {passHolder.points}
            </Typography>
            <Typography color="white" fontStyle="semibold" size="xsmall">
              punten
            </Typography>
          </View>
        </Styled.UserInfoContainer>
        <Styled.LogoContainer>
          <BrandLogo height={16} inverse />
        </Styled.LogoContainer>
        <Styled.BarcodeContainer>
          <Barcode format="CODE128" height={40} singleBarWidth={1.4} value={firstActiveCard.uitpasNumber} />
          <Typography>{firstActiveCard.uitpasNumber}</Typography>
        </Styled.BarcodeContainer>
      </Styled.ContentContainer>
      <Styled.TopCardView screenWidth={width}>
        <Styled.Triangle screenWidth={width} />
      </Styled.TopCardView>
      <Styled.BottomCardView screenWidth={width} />
    </Styled.CardContainer>
  );
};

export default UitpasCard;
