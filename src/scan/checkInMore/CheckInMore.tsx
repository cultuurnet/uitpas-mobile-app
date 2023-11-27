import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button, SafeAreaView, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { getAvatarByNameOrDefault } from '../../_utils';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { TFamilyMember } from '../../profile/_models';
import { TCheckInResponse } from '../_models';
import { useCheckin } from '../_queries/useCheckin';
import * as Styled from '../style';

type TProps = {
  navigation: TRootStackNavigationProp<'ScanSuccess'>;
  route: TRootStackRouteProp<'CheckInMore'>;
};

const isFulfilled = <T,>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

function mapMembersAndResponses(
  members: TFamilyMember[],
  responses: PromiseSettledResult<TCheckInResponse>[],
): { member: TFamilyMember; response: TCheckInResponse }[] {
  return members.map((member, index) => {
    const response = responses[index];
    return {
      member,
      response: response.status === 'fulfilled' ? response.value : response.reason,
    };
  });
}

const CheckInMore: FC = ({ navigation, route }: TProps) => {
  const { data: familyMembers } = useGetFamilyMembers();
  const {
    params: { checkinCode },
  } = route;
  const [checkedFamilyMembers, setCheckedFamilyMembers] = useState<TFamilyMember[]>([]);
  const { mutateAsync, isLoading } = useCheckin();

  function alterCheckedFamilyMembers(value: boolean, member: TFamilyMember) {
    if (value) {
      setCheckedFamilyMembers([...checkedFamilyMembers, member]);
    } else {
      setCheckedFamilyMembers(checkedFamilyMembers.filter(item => item !== member));
    }
  }

  async function handleCheckin() {
    try {
      const promises = checkedFamilyMembers.map(member => {
        return mutateAsync({ body: { checkinCode }, path: `/passholders/${member.passholder.id}/checkins` });
      });
      const responses = await Promise.allSettled(promises);
      // const mappedMembersAndResponses = mapMembersAndResponses(familyMembers, responses);
      // console.log('mappedMembersAndResponses', mappedMembersAndResponses);
    } catch (error) {
      console.log('error', error);
    }

    // navigation.navigate('ScanSuccess', responses[0]);
  }

  return (
    <SafeAreaView backgroundColor="neutral.0" edges={['bottom']} style={{ justifyContent: 'space-between', padding: 8 }}>
      <View>
        {familyMembers.map(member => (
          <Styled.MemberCheckbox
            checkedColor="neutral.0"
            iconSize={24}
            isChecked={checkedFamilyMembers.includes(member)}
            key={member.uitpasNumber}
            label={
              <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                  color={checkedFamilyMembers.includes(member) ? 'neutral.0' : 'neutral.900'}
                  style={{ marginLeft: 16 }}
                >
                  {member.passholder.firstName}
                </Typography>
                <Styled.FamilyAvatar resizeMode="contain" source={getAvatarByNameOrDefault(member?.icon)} />
              </View>
            }
            onChange={value => alterCheckedFamilyMembers(value, member)}
            unCheckedColor="primary.700"
          />
        ))}
      </View>
      <Button label="Spaar!" loading={isLoading} onPress={handleCheckin} />
    </SafeAreaView>
  );
};

export default CheckInMore;
