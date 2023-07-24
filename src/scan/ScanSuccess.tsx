import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import { PointsSuccess } from '../_assets/animations';
import { BoldTrans, Button, DiagonalSplitView, Typography } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'ScanSuccess'>;
  route: TRootStackRouteProp<'ScanSuccess'>;
};

const ScanSuccess: FC = ({ route, navigation }: TProps) => {
  const {
    params: { addedPoints, totalPoints },
  } = route;
  const { height } = useWindowDimensions();
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
              <BoldTrans
                i18nKey={`SCAN.SUCCESS.DESCRIPTION${addedPoints > 1 ? '_MULTIPLE' : ''}`}
                values={{ addedPoints, totalPoints }}
              />
            </Typography>
          </Styled.BottomContainer>
          <Button
            label={t('SCAN.SUCCESS.CTA')}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainNavigator', params: { screen: 'Profile' } }] })}
          />
        </>
      }
      topContent={<LottieView autoPlay loop source={PointsSuccess} style={{ height: height / 2.5 }} />}
    />
  );
};

export default ScanSuccess;
