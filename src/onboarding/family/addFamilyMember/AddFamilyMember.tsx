import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

import { Button, Typography } from '../../../_components';
import { TMainNavigationProp } from '../../../_routing';
import { applyBarcodeMask, DEFAULT_AVATAR_NAME, openExternalURL } from '../../../_utils';
import { TRegistrationTokenRequest, useGetRegistrationToken, useRegisterFamilyMember } from '../_queries';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

type TFormData = TRegistrationTokenRequest;

export const AddFamilyMember = ({ navigation }: TProps) => {
  const {
    control: formControl,
    formState: { errors },
    getValues: getFormValues,
    handleSubmit,
  } = useForm<TFormData>({
    defaultValues: {
      birthDate: null,
      uitpasNumber: '',
    },
  });

  const {
    data: registrationTokenResponse,
    error: registrationTokenError,
    mutate: getRegistrationToken,
    isLoading: registrationTokenIsLoading,
  } = useGetRegistrationToken();
  const { mutateAsync: registerFamilyMember } = useRegisterFamilyMember(registrationTokenResponse?.token);

  useEffect(() => {
    const registerFamilyMemberTask = async () => {
      try {
        await registerFamilyMember({
          icon: DEFAULT_AVATAR_NAME,
          uitpasNumber: getFormValues().uitpasNumber.replaceAll(' ', ''),
        });
        // TODO: Navigate to success screen
      } catch (error) {
        navigation.navigate('AddFamilyMemberError', { description: error.endUserMessage.nl });
      }
    };
    registrationTokenResponse?.token && registerFamilyMemberTask();
  }, [getFormValues, navigation, registerFamilyMember, registrationTokenResponse?.token]);

  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <Styled.ScreenContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={headerHeight - 16}>
      <Styled.InnerContainer contentContainerStyle={{ flexGrow: 1 }}>
        <Styled.Form>
          <Styled.FormBody>
            <Controller
              control={formControl}
              name="uitpasNumber"
              render={({ field: { onChange, value } }) => (
                <Styled.UitpasNumberInput
                  description={
                    <Typography size="small">
                      {t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_DESCRIPTION_1')}
                      <Styled.UitpasNumberDescriptionLink
                        color="primary.700"
                        onPress={() => openExternalURL(t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_DESCRIPTION_LINK'))}
                        size="small"
                      >
                        {t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_DESCRIPTION_2')}
                      </Styled.UitpasNumberDescriptionLink>
                    </Typography>
                  }
                  isError={!!errors?.uitpasNumber}
                  keyboardType="number-pad"
                  label={
                    <Styled.UitpasNumberLabelContainer>
                      <Styled.UitpasNumberLabel color="primary.700" fontStyle="semibold">
                        {t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER')}
                      </Styled.UitpasNumberLabel>
                      <Styled.UitpasNumberTooltip />
                    </Styled.UitpasNumberLabelContainer>
                  }
                  maxLength={16}
                  onChangeText={onChange}
                  value={applyBarcodeMask(value)}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={formControl}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <Styled.BirthDateInput
                  date={value}
                  isError={!!errors?.birthDate}
                  label="ONBOARDING.FAMILY.ADD_MEMBER.BIRTHDATE"
                  onSelectDate={onChange}
                />
              )}
              rules={{ required: true }}
            />
            {Object.keys(errors).length > 0 && (
              <Styled.FormError color="error.700">{t('ONBOARDING.FAMILY.ADD_MEMBER.MISSING_FIELDS')}</Styled.FormError>
            )}
            {registrationTokenError?.status === 403 && (
              <Styled.FormError color="error.700">{registrationTokenError.endUserMessage.nl}</Styled.FormError>
            )}
          </Styled.FormBody>
          <Typography align="center">{t('ONBOARDING.FAMILY.ADD_MEMBER.INFO')}</Typography>
        </Styled.Form>
      </Styled.InnerContainer>
      <Styled.StickyFooter style={{ marginBottom: bottom }}>
        <Button
          label={t('ONBOARDING.FAMILY.ADD_MEMBER.ADD')}
          loading={registrationTokenIsLoading}
          onPress={handleSubmit(formData => getRegistrationToken(formData))}
        />
        {registrationTokenError?.status === 403 && (
          <Styled.CancelButton color="primary.700" label={t('ONBOARDING.FAMILY.ADD_MEMBER.CANCEL')} variant="outline" />
        )}
      </Styled.StickyFooter>
    </Styled.ScreenContainer>
  );
};
