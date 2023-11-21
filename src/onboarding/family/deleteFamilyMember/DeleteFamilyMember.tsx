import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { BlurredModal, Icon, Trans } from '../../../_components';
import { queryClient } from '../../../_context';
import { useDeleteFamilyMember } from '../_queries';
import * as Styled from './style';

type TProps = {
  familyMemberId: string;
  name: string;
};

const DeleteFamilyMember = ({ name, familyMemberId }: TProps) => {
  const navigation = useNavigation();
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
    navigation.goBack();
  };

  return (
    <>
      <Styled.DeleteButtonContainer>
        <Icon name="Delete" />
        <Styled.DeleteMemberButton
          color="error.800"
          fontStyle="normal"
          label={t('ONBOARDING.FAMILY.EDIT_MEMBER.DELETE_MEMBER')}
          onPress={handleToggleIsVisible}
          underline={false}
          variant="link"
        />
      </Styled.DeleteButtonContainer>
      <BlurredModal isVisible={isVisible} toggleIsVisible={handleToggleIsVisible}>
        <Styled.Title fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.TITLE')}
        </Styled.Title>
        <Trans i18nKey="ONBOARDING.FAMILY.DELETE_MEMBER.CONFIRMATION_MODAL.DESCRIPTION" values={{ name }} />
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
