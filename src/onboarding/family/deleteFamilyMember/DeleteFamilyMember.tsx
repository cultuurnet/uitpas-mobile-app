import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle, StyleProp } from 'react-native';

import { BlurredModal, Icon, TouchableRipple, Trans, Typography } from '../../../_components';
import { queryClient } from '../../../_context';
import { useDeleteFamilyMember } from '../_queries';
import * as Styled from './style';

type TProps = {
  familyMemberId: string;
  name: string;
  style?: StyleProp<ImageStyle>;
};

const DeleteFamilyMember = ({ style, name, familyMemberId }: TProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { mutateAsync, isLoading } = useDeleteFamilyMember(familyMemberId);
  const { t } = useTranslation();

  const handleToggleIsVisible = () => {
    setIsVisible(currentIsVisible => !currentIsVisible);
  };

  const handleDelete = async () => {
    await mutateAsync({});
    queryClient.invalidateQueries(['family-members']);
    handleToggleIsVisible();
  };

  return (
    <>
      <TouchableRipple onPress={handleToggleIsVisible} style={style}>
        <>
          <Icon name="Delete" size="small" style={style} />
          <Typography color="error.800">{t('ONBOARDING.FAMILY.DELETE_MEMBER.CTA')}</Typography>
        </>
      </TouchableRipple>
      <BlurredModal isVisible={isVisible} toggleIsVisible={handleToggleIsVisible}>
        <Styled.Title fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.TITLE')}
        </Styled.Title>
        <Trans i18nKey="ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.DESCRIPTION" values={{ name }} />
        <Styled.DeleteButton
          fontStyle="semibold"
          label={t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.CONFIRM')}
          loading={isLoading}
          onPress={handleDelete}
          underline={false}
        />
        <Styled.CloseButton
          color="primary.700"
          fontStyle="semibold"
          label={t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.CANCEL')}
          onPress={handleToggleIsVisible}
          variant="outline"
        />
      </BlurredModal>
    </>
  );
};

export default DeleteFamilyMember;
