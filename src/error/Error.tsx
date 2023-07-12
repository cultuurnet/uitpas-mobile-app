import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Error as ErrorImage } from '../_assets/images';
import { Analytics, Button, DiagonalSplitView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing/_components/TRootStackParamList';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'Error'>;
  route: TRootStackRouteProp<'Error'>;
};

const Error = ({ route, navigation }: TProps) => {
  const {
    params: { message, gotoAfterClose },
  } = route;
  const { t } = useTranslation();

  const onClose = useCallback(() => {
    if (typeof gotoAfterClose === 'string') {
      return navigation.reset({ index: 0, routes: [{ name: gotoAfterClose }] });
    } else {
      return navigation.reset({ index: 0, routes: [{ name: gotoAfterClose[0], params: { screen: gotoAfterClose[1] } }] });
    }
  }, [gotoAfterClose, navigation]);

  return (
    <>
      <Analytics screenName="Error" />
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
    </>
  );
};

export default Error;
