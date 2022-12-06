import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { PointsSuccess } from '../_assets/animations';
import { Button, DiagonalSplitView, Typography } from '../_components';
import { useStackNavigation } from '../_hooks';
import { TRootParams } from '../_routing/_components/RootStackNavigator';
import * as Styled from './style';

const ScanSuccess: FC = () => {
  const {
    params: { addedPoints, totalPoints },
  } = useRoute<RouteProp<TRootParams, 'ScanSuccess'>>();
  const { height } = useWindowDimensions();
  const navigation = useStackNavigation<TRootParams>();
  const { t } = useTranslation();

  return (
    <DiagonalSplitView
      bottomContent={
        <>
          <Styled.BottomContainer>
            <Styled.SavedPoints>
              <Typography color="primary.700" fontStyle="bold" size="xxlarge">
                +{addedPoints}
              </Typography>
            </Styled.SavedPoints>
            <Typography align="center">
              <Trans
                components={{ bold: <Typography fontStyle="bold" /> }}
                i18nKey={`SCAN.SUCCESS.DESCRIPTION${addedPoints > 1 ? 'MULTIPLE' : ''}`}
                values={{ addedPoints, totalPoints }}
              />
            </Typography>
          </Styled.BottomContainer>
          <Button
            label={t('SCAN.SUCCESS.CTA')}
            onPress={() => navigation.replace('MainNavigator', { screen: 'Camera' } as unknown as undefined)} // Types in react-navigation package are incorrect...
          />
        </>
      }
      topContent={<LottieView autoPlay loop={false} source={PointsSuccess} style={{ height: height / 2.5 }} />}
    />
  );
};

export default ScanSuccess;
