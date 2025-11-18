import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { theme } from '../../_styles/theme';
import * as Styled from './style';

type TProps = SvgProps & {
  theme?: 'primary' | 'white';
};

export const InAppRewardLabel = ({ theme: mode = 'primary', ...props }: TProps) => {
  const { t } = useTranslation();

  return (
    <Styled.InAppRewardContainer {...props}>
      <Svg fill="none" height="20" viewBox="0 0 8 22" width="8">
        <Path
          d="M9.14229e-08 22H7.80196V0H0C2.95351 2.73949 4.80186 6.65389 4.80186 11C4.80186 15.3461 2.95351 19.2605 9.14229e-08 22Z"
          fill={mode === 'primary' ? theme.palette.primary[600] : theme.palette.neutral[0]}
        />
      </Svg>
      <Styled.InAppRewardContent mode={mode}>
        <Styled.InAppRewardLabel
          allowFontScaling={false}
          color={mode === 'primary' ? 'neutral.0' : 'primary.600'}
          fontStyle="bold"
        >
          {t('SHOP.ONLINE_REWARD')}
        </Styled.InAppRewardLabel>
      </Styled.InAppRewardContent>
    </Styled.InAppRewardContainer>
  );
};
