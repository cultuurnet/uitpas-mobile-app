import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import { PointsSuccess } from '../_assets/animations';
import { Analytics, Button, DiagonalSplitView, Trans, Typography } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { useHasFamilyMembers } from '../onboarding/family/_queries';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'ScanSuccess'>;
  route: TRootStackRouteProp<'ScanSuccess'>;
};

// `accessible` is missing from LottieView's public props, but `...rest` forwards it to the native view.
const lottieAccessibilityProps = { accessible: false };

const ScanSuccess: FC = ({ route, navigation }: TProps) => {
  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const {
    params: { addedPoints, totalPoints, checkinCode },
  } = route;
  const { height } = useWindowDimensions();
  const { t } = useTranslation();
  const announcement = t(`SCAN.SUCCESS.ANNOUNCEMENT${addedPoints > 1 ? '_MULTIPLE' : ''}`, { addedPoints, totalPoints });

  return (
    <>
      <Analytics screenName="CheckinSuccess" />
      <DiagonalSplitView
        bottomContent={
          <>
            <Styled.BottomContainer accessibilityLabel={announcement} accessible>
              <Styled.SavedPoints>
                <Typography
                  accessible={false}
                  color="primary.700"
                  fontStyle="bold"
                  importantForAccessibility="no-hide-descendants"
                  size="xxlarge"
                >
                  +{addedPoints}
                </Typography>
              </Styled.SavedPoints>
              <Typography accessible={false} align="center" importantForAccessibility="no-hide-descendants">
                <Trans
                  i18nKey={`SCAN.SUCCESS.DESCRIPTION${addedPoints > 1 ? '_MULTIPLE' : ''}`}
                  values={{ addedPoints, totalPoints }}
                />
              </Typography>
            </Styled.BottomContainer>
            {hasFamilyMembers && (
              <Styled.ScanMoreButton
                label={t('SCAN.SUCCESS.SCAN_MORE')}
                onPress={() => navigation.navigate('FamilyCheckin', { checkinCode })}
              />
            )}
            <Button
              color="primary.700"
              label={t('SCAN.SUCCESS.CLOSE')}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainNavigator', params: { screen: 'Profile' } }] })}
              variant="outline"
            />
          </>
        }
        topContent={
          <LottieView {...lottieAccessibilityProps} autoPlay loop source={PointsSuccess} style={{ height: height / 3 }} />
        }
      />
    </>
  );
};

export default ScanSuccess;
