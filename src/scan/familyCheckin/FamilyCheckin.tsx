import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Analytics } from '../../_components';
import { useTracking } from '../../_context';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { getAvatarByNameOrDefault, TRACKING_URL_REGEX } from '../../_utils';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { TFamilyMember } from '../../profile/_models';
import { TCheckInResponse } from '../_models';
import { useCheckin } from '../_queries/useCheckin';
import { TFamilyScanResponse } from '../familyCheckinSummary/_models';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'ScanSuccess'>;
  route: TRootStackRouteProp<'FamilyCheckin'>;
};

const FamilyCheckin: FC = ({ navigation, route }: TProps) => {
  const {
    params: { checkinCode },
  } = route;

  const { t } = useTranslation();

  const { data: familyMembers = [] } = useGetFamilyMembers();
  const otherFamilyMembers = useMemo(() => {
    return familyMembers?.filter(({ mainFamilyMember }) => !mainFamilyMember) ?? [];
  }, [familyMembers]);
  const [checkedFamilyMembers, setCheckedFamilyMembers] = useState<TFamilyMember[]>([]);
  const { trackSelfDescribingEvent } = useTracking();
  const { mutateAsync: checkin, isLoading } = useCheckin();

  const updateCheckedFamilyMembers = (value: boolean, checkedMember: TFamilyMember) => {
    if (value) {
      setCheckedFamilyMembers(currentCheckedFamilyMembers => {
        const checkedFamilyMembers = [...currentCheckedFamilyMembers, checkedMember];
        return familyMembers.filter(familyMember => checkedFamilyMembers.includes(familyMember)); // Store `checkedFamilyMembers` in the original order
      });
    } else {
      setCheckedFamilyMembers(currentCheckedFamilyMembers => currentCheckedFamilyMembers.filter(item => item !== checkedMember));
    }
  };

  const handleCheckins = async () => {
    const promises = checkedFamilyMembers.map(member => {
      return checkin({ body: { checkinCode }, path: `/passholders/${member.passholder.id}/checkins` });
    });
    const responses = await Promise.allSettled(promises);
    const memberResponses = mapFamilyMembersToResponses(checkedFamilyMembers, responses);
    memberResponses.forEach(response => {
      const sharedAction = {
        name: 'save-points' as const,
        target: 'family-member' as const,
        target_ph_id: response.member.passholder.id,
      };
      if (response.response.type === 'success') {
        trackSelfDescribingEvent(
          'successMessage',
          { message: 'points-saved-success' },
          {
            up_action: {
              ...sharedAction,
              points: response.response.value.addedPoints,
            },
          },
        );
      } else {
        trackSelfDescribingEvent(
          'errorMessage',
          { message: response.response.error.type.replace(TRACKING_URL_REGEX, '') },
          {
            up_action: {
              ...sharedAction,
              points: 0,
            },
          },
        );
      }
    });
    navigation.navigate('FamilyCheckinSummary', { memberResponses });
  };

  return (
    <>
      <Analytics screenName="FamilyCheckin" />
      <Styled.SafeAreaViewContainer backgroundColor="neutral.0" edges={['bottom']} isScrollable={false}>
        <FlatList
          ItemSeparatorComponent={Styled.Divider}
          contentContainerStyle={{ padding: 16 }}
          data={otherFamilyMembers}
          keyExtractor={item => item.uitpasNumber}
          renderItem={({ item: familyMember }) => (
            <Styled.FamilyMemberCheckbox
              checkedColor="neutral.0"
              iconSize={24}
              isChecked={checkedFamilyMembers.includes(familyMember)}
              key={familyMember.uitpasNumber}
              label={
                <Styled.FamilyMemberLabel>
                  <Styled.FamilyMemberName color={checkedFamilyMembers.includes(familyMember) ? 'neutral.0' : 'neutral.900'}>
                    {familyMember.passholder.firstName}
                  </Styled.FamilyMemberName>
                  <Styled.FamilyMemberAvatar resizeMode="contain" source={getAvatarByNameOrDefault(familyMember?.icon)} />
                </Styled.FamilyMemberLabel>
              }
              onChange={value => updateCheckedFamilyMembers(value, familyMember)}
              unCheckedColor="primary.700"
            />
          )}
        />
        <Styled.CheckinButton
          disabled={checkedFamilyMembers.length === 0}
          label={t('SCAN.FAMILY_MEMBERS.CHECKIN')}
          loading={isLoading}
          onPress={handleCheckins}
        />
      </Styled.SafeAreaViewContainer>
    </>
  );
};

const mapFamilyMembersToResponses = (
  members: TFamilyMember[],
  responses: PromiseSettledResult<TCheckInResponse>[],
): { member: TFamilyMember; response: TFamilyScanResponse }[] => {
  return members.map((member, index) => {
    const response = responses[index];
    return {
      member,
      response:
        response.status === 'fulfilled' ? { type: 'success', value: response.value } : { error: response.reason, type: 'error' },
    };
  });
};

export default FamilyCheckin;
