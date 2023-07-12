import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../_components';
import i18n from '../../_translations/i18n';
import { getPassHolderRegions } from '../../_utils';
import { TPassHolder } from '../_models';
import { applyBarcodeMask } from '../_util/mask';
import * as Styled from './style';

type TProps = {
  isLarge?: boolean;
  passHolder: TPassHolder;
};

const UitpasCard: FC<TProps> = ({ passHolder, isLarge }) => {
  const { width } = useWindowDimensions();

  const passHolderRegions = getPassHolderRegions(passHolder);
  const [firstPassHolderRegion] = passHolderRegions;

  return (
    <>
      <Styled.CardContainer>
        <Styled.ContentContainer screenWidth={width}>
          <Styled.UserInfoContainer>
            <Styled.CardsView>
              <Typography color="neutral.0" fontStyle="bold">
                {`${passHolder.firstName} ${passHolder.name}`}
              </Typography>
              <Typography color="neutral.0" size="small">
                {isLarge
                  ? passHolderRegions.map(card => card.cardSystem.name).join(', ')
                  : `${firstPassHolderRegion}${passHolderRegions.length > 1 ? ', ...' : ''}`}
              </Typography>
            </Styled.CardsView>
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
            {firstPassHolderRegion.uitpasNumber && (
              <>
                <Barcode
                  format="CODE128"
                  height={isLarge ? 80 : 40}
                  singleBarWidth={isLarge ? 2 : 1.4}
                  value={firstPassHolderRegion.uitpasNumber || ''}
                />
                <Typography size={isLarge ? 'normal' : 'small'} topSpacing={isLarge ? '8px' : ''}>
                  {applyBarcodeMask(firstPassHolderRegion.uitpasNumber)}
                </Typography>
              </>
            )}
          </Styled.BarcodeContainer>
          <Styled.Triangle screenWidth={width} />
          <Styled.BottomCardView />
        </Styled.ContentContainer>
      </Styled.CardContainer>
    </>
  );
};

export default UitpasCard;
