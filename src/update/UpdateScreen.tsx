import React from 'react';
import { Platform } from 'react-native';

import { Analytics, DiagonalSplitView, Spinner, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import i18n from '../_translations/i18n';
import { useGetMe } from '../profile/_queries/useGetMe';
import UitpasCard from '../profile/UitpasCards/UitpasCard/UitpasCard';
import * as Styled from './style';

const UpdateScreen = () => {
  const { data: passHolder, isLoading: isPassHolderLoading } = useGetMe();

  if (isPassHolderLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Analytics screenName="Update" />
      <DiagonalSplitView
        backgroundColor="primary.300"
        bottomContent={
          <>
            <Styled.TextView>
              <Typography color="primary.800" fontStyle="bold" size="xxlarge">
                {i18n.t('UPDATE.NECESSARY')}
              </Typography>
              <Typography align="center" size="large">
                {i18n.t('UPDATE.DISCLAIMER')}
              </Typography>
            </Styled.TextView>
            <Styled.ButtonView>
              <Styled.ActionButton centered href={ConfigUrl.helpdesk} label={i18n.t('GENERAL.PROBLEM')} variant="link" />
              <Styled.ActionButton
                centered
                href={Platform.OS === 'ios' ? ConfigUrl.appStore : ConfigUrl.playStore}
                label={i18n.t('UPDATE.STORE_BUTTON')}
              />
            </Styled.ButtonView>
          </>
        }
        lineColor="primary.500"
        topContent={
          <Styled.TopView>
            <Styled.CardView>
              <UitpasCard passHolder={passHolder} />
            </Styled.CardView>
          </Styled.TopView>
        }
      />
    </>
  );
};

export default UpdateScreen;
