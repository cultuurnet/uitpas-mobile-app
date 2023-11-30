import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { getAvatarByNameOrDefault } from '../../_utils';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { TFamilyMember } from '../../profile/_models';
import { TCheckInResponse } from '../_models';
import { useCheckin } from '../_queries/useCheckin';
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

  const { data: familyMembers } = useGetFamilyMembers();
  const otherFamilyMembers = useMemo(() => {
    return familyMembers?.filter(({ mainFamilyMember }) => !mainFamilyMember) ?? [];
  }, [familyMembers]);
  const [checkedFamilyMembers, setCheckedFamilyMembers] = useState<TFamilyMember[]>([]);
  const { mutateAsync: checkin, isLoading } = useCheckin();

  const updateCheckedFamilyMembers = (value: boolean, member: TFamilyMember) => {
    if (value) {
      setCheckedFamilyMembers(currentCheckedFamilyMembers => [...currentCheckedFamilyMembers, member]);
    } else {
      setCheckedFamilyMembers(currentCheckedFamilyMembers => currentCheckedFamilyMembers.filter(item => item !== member));
    }
  };

  const handleCheckins = async () => {
    const promises = checkedFamilyMembers.map(member => {
      return checkin({ body: { checkinCode }, path: `/passholders/${member.passholder.id}/checkins` });
    });
    const responses = await Promise.allSettled(promises);
    const familyMemberResponses = mapFamilyMembersToResponses(checkedFamilyMembers, responses);
    navigation.navigate('FamilyCheckinSummary', { familyMemberResponses });
  };

  return (
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
  );
};

const mapFamilyMembersToResponses = (
  members: TFamilyMember[],
  responses: PromiseSettledResult<TCheckInResponse>[],
): { member: TFamilyMember; response: TCheckInResponse }[] => {
  return members.map((member, index) => {
    const response = responses[index];
    return {
      member,
      response: response.status === 'fulfilled' ? response.value : response.reason,
    };
  });
};

export default FamilyCheckin;
