import React from 'react';
import { Platform } from 'react-native';

import { Typography } from '../../_components';
import { ConfigUrl } from '../../_config';
import i18n from '../../_translations/i18n';
import * as Styled from './style';

const UpdateNotification = () => {
  return (
    <Styled.NotificationContainer>
      <Styled.TextView>
        <Typography color="white" fontStyle="semibold">
          {i18n.t('UPDATE.AVAILABLE')}
        </Typography>
      </Styled.TextView>
      <Styled.UpdateButton
        centered
        color="blue"
        hitSlop={20}
        href={Platform.OS === 'ios' ? ConfigUrl.appStore : ConfigUrl.playStore}
        label="Update"
        underline={false}
        variant="link"
      />
    </Styled.NotificationContainer>
  );
};

export default UpdateNotification;
