import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Error as ErrorImage } from '../_assets/images';
import { Button, DiagonalSplitView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { TRootParams } from '../_routing/_components/RootStackNavigator';
import * as Styled from './style';

const Error: FC = () => {
  const {
    params: { message, onClose },
  } = useRoute<RouteProp<TRootParams, 'Error'>>();
  const { t } = useTranslation();

  return (
    <DiagonalSplitView
      backgroundColor="error.300"
      bottomContent={
        <>
          <Styled.BottomContainer>
            <Typography bottomSpacing="24px" color="error.600" fontStyle="bold" size="xxlarge">
              {t('ERROR.TITLE')}
            </Typography>
            <Typography align="center">{message || t('ERROR.DEFAULT_MESSAGE')}</Typography>
          </Styled.BottomContainer>

          <Button href={ConfigUrl.helpdesk} label={t('ERROR.HELP')} variant="link" />
          <Styled.CloseButton label={t('ERROR.CTA')} onPress={onClose} />
        </>
      }
      lineColor="error.600"
      topContent={<Styled.ErrorImage resizeMode="contain" source={ErrorImage} />}
    />
  );
};

export default Error;
