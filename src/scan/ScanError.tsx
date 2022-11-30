import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Error } from '../_assets/images';
import { Button, DiagonalSplitView, Typography } from '../_components';
import { useStackNavigation } from '../_hooks';
import { TRootParams } from '../_routing/_components/RootStackNavigator';
import * as Styled from './style';

const ScanError: FC = () => {
  const {
    params: { error },
  } = useRoute<RouteProp<TRootParams, 'ScanError'>>();
  const navigation = useStackNavigation<TRootParams>();
  const { t } = useTranslation();

  return (
    <DiagonalSplitView
      backgroundColor="redLighter"
      bottomContent={
        <>
          <Styled.BottomContainer>
            <Typography bottomSpacing="24px" color="red" fontStyle="bold" size="xxlarge">
              {t('SCAN.ERROR.TITLE')}
            </Typography>
            <Typography align="center">{error}</Typography>
          </Styled.BottomContainer>
          <Button
            label={t('SCAN.ERROR.CTA')}
            onPress={() => navigation.replace('MainNavigator', { screen: 'Camera' } as unknown as undefined)} // Types in react-navigation package are incorrect...
          />
        </>
      }
      lineColor="red"
      topContent={<Styled.ErrorImage resizeMode="contain" source={Error} />}
    />
  );
};

export default ScanError;
