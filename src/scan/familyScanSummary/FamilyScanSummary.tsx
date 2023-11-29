import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Check } from '../../_assets/images';
import { DiagonalSplitView, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { TFamilyMember } from '../../profile/_models';
import { ErrorIcon, PointsRedeemedIcon } from './icons';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FamilyScanSummary'>;
  route: TRootStackRouteProp<'FamilyScanSummary'>;
};

export const FamilyScanSummary = ({ navigation, route }: TProps) => {
  const { memberResponses } = route.params;

  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const FamilyMembersSummary = useCallback(() => {
    const getResponseByMember = (member: TFamilyMember) => {
      const index = memberResponses.findIndex(
        ({
          member: {
            passholder: { id },
          },
        }) => member.passholder.id === id,
      );
      return memberResponses[index].response;
    };

    const renderIcon = ({ member }: { member: TFamilyMember }) => {
      const response = getResponseByMember(member);
      if (response.type === 'success') {
        return <PointsRedeemedIcon count={response.value.addedPoints} />;
      }
      return <ErrorIcon />;
    };

    const renderErrorDescription = ({ member }: { member: TFamilyMember }) => {
      const response = getResponseByMember(member);
      if (response.type === 'error') {
        return <Typography size="small">{response.error.endUserMessage.nl}</Typography>;
      }
      return (
        <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
          {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: member.passholder.points })}
        </Typography>
      );
    };

    return (
      <Styled.FamilyMembersPoints
        RightComponent={renderIcon}
        Subtitle={renderErrorDescription}
        members={memberResponses.map(({ member }) => member)}
      />
    );
  }, [memberResponses, t]);

  return (
    <>
      <DiagonalSplitView
        bottomContent={
          <Styled.Body>
            <FamilyMembersSummary />
            <Styled.CloseButton
              label={t('SCAN.FAMILY_MEMBERS.SUMMARY.CLOSE')}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainNavigator', params: { screen: 'Profile' } }] })}
            />
          </Styled.Body>
        }
        bottomContentStyle={{ paddingLeft: 0, paddingRight: 0 }}
        topContent={null}
      />
      <Styled.Header style={{ top: top + 16 }}>
        <Styled.HeaderImage source={Check} />
        <Styled.HeaderTitle color="primary.700" fontStyle="bold" size="large">
          {t('SCAN.FAMILY_MEMBERS.SUMMARY.DESCRIPTION')}
        </Styled.HeaderTitle>
      </Styled.Header>
    </>
  );
};
