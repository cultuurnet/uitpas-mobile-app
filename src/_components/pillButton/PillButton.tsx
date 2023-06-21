import React from 'react';

import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  count?: number;
  icon: TIconName;
  label: string;
  onPress: () => void;
};

const PillButton = ({ icon, label, onPress, count, ...props }: TProps) => {
  const hasCount = count !== undefined && count > 0;

  return (
    <Styled.PillButton {...props} $hasCount={hasCount} inline onPress={onPress} radius>
      <>
        <Icon color={hasCount ? 'neutral.0' : 'primary.800'} name={icon} size={22} />
        <Styled.PillButtonLabel color={hasCount ? 'neutral.0' : 'primary.800'} size="small">
          {label}
        </Styled.PillButtonLabel>
        {hasCount && <Styled.PillButtonCount>{count}</Styled.PillButtonCount>}
      </>
    </Styled.PillButton>
  );
};

export default PillButton;
