import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import Barcode from 'react-native-barcode-svg';

import { BrandLogo, Typography } from '../../../_components';
import i18n from '../../../_translations/i18n';
import { applyBarcodeMask, getAvatarByNameOrDefault, getPassHolderRegions } from '../../../_utils';
import { TPassHolder } from '../../_models';
import * as Styled from './style';

type TProps = {
  hasYouSuffix?: boolean;
  icon?: string;
  isLarge?: boolean;
  passHolder: TPassHolder;
  scale?: number; // Defaults to 1, i.e. full width
};

const UitpasCard: FC<TProps> = ({ passHolder, hasYouSuffix, icon, scale = 1, isLarge }) => {
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();

  const passHolderRegions = getPassHolderRegions(passHolder);
  const [firstPassHolderRegion] = passHolderRegions;

  return (
    <Styled.CardContainer>
      <Styled.ContentContainer scale={scale} screenWidth={screenWidth}>
        <Styled.UserInfoContainer>
          {icon && <Styled.UserAvatar resizeMode="contain" source={getAvatarByNameOrDefault(icon)} />}
          <Styled.CardsView>
            <Typography color="neutral.0" fontStyle="bold" numberOfLines={!isLarge ? 1 : null}>
              {`${passHolder.firstName} ${passHolder.name}`}
              {hasYouSuffix ? ` ${t('PROFILE.YOU')}` : ''}
            </Typography>
            <Typography color="neutral.0" ellipsizeMode="clip" numberOfLines={!isLarge ? 1 : null} size="small">
              {isLarge
                ? passHolderRegions.map(card => card.cardSystem.name).join(', ')
                : `${firstPassHolderRegion?.cardSystem?.name}${passHolderRegions.length > 1 ? ', ...' : ''}`}
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
        <Styled.Triangle scale={scale} screenWidth={screenWidth} />
        <Styled.BottomCardView />
      </Styled.ContentContainer>
    </Styled.CardContainer>
  );
};

export default UitpasCard;
