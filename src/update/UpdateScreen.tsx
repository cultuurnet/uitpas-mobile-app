import React from 'react';

import { DiagonalSplitView, Spinner, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import i18n from '../_translations/i18n';
import { useGetMe } from '../profile/_queries/useGetMe';
import UitpasCard from '../profile/UitpasCard/UitpasCard';
import * as Styled from './style';

const UpdateScreen = () => {
  const { data: passHolder, isLoading: isPassHolderLoading } = useGetMe();

  if (isPassHolderLoading) {
    return <Spinner />;
  }
  return (
    <DiagonalSplitView
      backgroundColor="lightBlue"
      bottomContent={
        <>
          <Styled.TextView>
            <Typography color="primaryDark" fontStyle="bold" size="xxlarge">
              {i18n.t('UPDATE.NECESSARY')}
            </Typography>
            <Typography align="center" size="large">
              {i18n.t('UPDATE.DISCLAIMER')}
            </Typography>
          </Styled.TextView>
          <Styled.ButtonView>
            <Styled.ActionButton centered href={ConfigUrl.helpdesk} label={i18n.t('GENERAL.PROBLEM')} variant="link" />
            <Styled.ActionButton centered href={ConfigUrl.helpdesk} label={i18n.t('UPDATE.STORE_BUTTON')} />
          </Styled.ButtonView>
        </>
      }
      lineColor="blueGreen"
      topContent={
        <Styled.TopView>
          <Styled.CardView>
            <UitpasCard passHolder={passHolder} />
          </Styled.CardView>
        </Styled.TopView>
      }
    />
  );
};

export default UpdateScreen;
