import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Check } from '../../_assets/images';
import { Analytics, DiagonalSplitView, FamilyMembersPoints, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { TFamilyMember } from '../../profile/_models';
import { TFamilyScanResponse } from './_models';
import { CheckinErrorIcon, CheckinSuccessIcon } from './icons';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FamilyCheckinSummary'>;
  route: TRootStackRouteProp<'FamilyCheckinSummary'>;
};

type FamilyMembersSummaryItem = { item: { member: TFamilyMember; response: TFamilyScanResponse } };

export const FamilyCheckinSummary = ({ navigation, route }: TProps) => {
  const { memberResponses } = route.params;

  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const FamilyMembersSummary = useCallback(() => {
    const renderIcon = ({ item: { response } }: FamilyMembersSummaryItem) => {
      if (response.type === 'success') {
        return <CheckinSuccessIcon numberOfPoints={response.value.addedPoints} />;
      }
      return <CheckinErrorIcon />;
    };

    const renderSubtitle = ({ item: { response } }: FamilyMembersSummaryItem) => {
      if (response.type === 'error') {
        return <Typography size="small">{response.error.endUserMessage.nl}</Typography>;
      }
      return (
        <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
          {t('SCAN.FAMILY_MEMBERS.SUMMARY.SUCCEEDED', { count: response.value.totalPoints })}
        </Typography>
      );
    };

    return (
      <FamilyMembersPoints
        ItemRightComponent={renderIcon}
        ItemSubtitle={renderSubtitle}
        members={memberResponses}
        style={{ paddingHorizontal: 16 }}
      />
    );
  }, [memberResponses, t]);

  return (
    <>
      <Analytics screenName="FamilyCheckinSummary" />
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
      </Styled.Header>
    </>
  );
};
