import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BlurredModal, Icon, Trans } from '../../../_components';
import { queryClient, useTracking } from '../../../_context';
import { useDeleteFamilyMember } from '../_queries';
import * as Styled from './style';

type TProps = {
  familyMemberId: string;
  firstName: string;
  fullName: string;
  style?: StyleProp<ViewStyle>;
};

const DeleteFamilyMember = ({ firstName, fullName, familyMemberId, style }: TProps) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const { mutateAsync, isLoading } = useDeleteFamilyMember(familyMemberId);
  const { trackSelfDescribingEvent } = useTracking();
  const { t } = useTranslation();

  const handleToggleIsVisible = () => {
    setIsVisible(currentIsVisible => !currentIsVisible);
  };

  const handleDelete = async () => {
    await mutateAsync({});
    trackSelfDescribingEvent('successMessage', { message: 'family-member-deleted' });
    queryClient.invalidateQueries(['family']);
    handleToggleIsVisible();
    navigation.goBack();
  };

  return (
    <>
      <Styled.DeleteButton onPress={handleToggleIsVisible} style={style}>
        <>
          <Icon name="Delete" size="small" />
          <Styled.DeleteLabel color="error.800">{t('ONBOARDING.FAMILY.DELETE_MEMBER.CTA')}</Styled.DeleteLabel>
        </>
      </Styled.DeleteButton>
      <BlurredModal isVisible={isVisible} toggleIsVisible={handleToggleIsVisible}>
        <Styled.UserName fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.TITLE')}
        </Styled.UserName>
        <Trans i18nKey="ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.DESCRIPTION" values={{ firstName, fullName }} />
        <Styled.DeleteModalButton
          backgroundColor="error.700"
          fontStyle="semibold"
          label={t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.CONFIRM')}
          loading={isLoading}
          onPress={handleDelete}
          underline={false}
        />
        <Styled.CloseModalButton
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
