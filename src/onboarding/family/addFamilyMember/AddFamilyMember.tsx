import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

import { Analytics, Button, Trans, Typography } from '../../../_components';
import { queryClient, useTracking } from '../../../_context';
import { TMainNavigationProp, TRootStackRouteProp } from '../../../_routing';
import { applyBarcodeMask, getRandomUniqueAvatar, openExternalURL, TRACKING_URL_REGEX } from '../../../_utils';
import { TRegistrationTokenRequest, useGetRegistrationToken, useRegisterFamilyMember } from '../_queries';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
  route: TRootStackRouteProp<'AddFamilyMember'>;
};

type TFormData = TRegistrationTokenRequest;

export const AddFamilyMember = ({ navigation, route }: TProps) => {
  const { familyMembers } = route.params;
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
  const { trackSelfDescribingEvent } = useTracking();

  const {
    error: registrationTokenError, // Inline error
    isLoading: registrationTokenIsLoading,
    mutate: getRegistrationToken,
  } = useGetRegistrationToken({
    onError: () => {
      trackSelfDescribingEvent('errorMessage', { message: 'card-dob-mismatch' });
    },
    onSuccess: async ({ token }) => {
      try {
        await registerFamilyMember({
          body: {
            icon: getRandomUniqueAvatar(familyMembers),
            uitpasNumber: getFormValues().uitpasNumber.replaceAll(' ', ''),
          },
          headers: { 'x-registration-token': token },
        });
        trackSelfDescribingEvent('successMessage', { message: 'family-member-added' });
        queryClient.invalidateQueries(['family']);
        navigation.navigate('FamilyOverview');
      } catch (error) {
        trackSelfDescribingEvent('errorMessage', { message: error.type.replace(TRACKING_URL_REGEX, '').substring(0, 100) });
        navigation.navigate('AddFamilyMemberError', { description: error.endUserMessage.nl }); // End-of-flow error
      }
    },
  });
  const { mutateAsync: registerFamilyMember, isLoading: registerFamilyMemberIsLoading } = useRegisterFamilyMember();

  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <>
      <Analytics screenName="AddFamilyMember" />
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
                      <Trans
                        i18nKey="ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_DESCRIPTION"
                        onButtonPress={() => openExternalURL(t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_DESCRIPTION_LINK'))}
                        size="small"
                      />
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
              {registrationTokenError && (
                <Styled.FormError color="error.700">{registrationTokenError.endUserMessage.nl}</Styled.FormError>
              )}
            </Styled.FormBody>
            <Typography align="center">{t('ONBOARDING.FAMILY.ADD_MEMBER.INFO')}</Typography>
          </Styled.Form>
        </Styled.InnerContainer>
        <Styled.StickyFooter style={{ marginBottom: bottom }}>
          <Button
            label={t('ONBOARDING.FAMILY.ADD_MEMBER.ADD')}
            loading={registrationTokenIsLoading || registerFamilyMemberIsLoading}
            onPress={handleSubmit(formData => getRegistrationToken(formData))}
          />
        </Styled.StickyFooter>
      </Styled.ScreenContainer>
    </>
  );
};
