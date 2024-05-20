import React from 'react';

import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  amount?: number;
  icon: TIconName;
  label: string;
  onPress: () => void;
};

const PillButton = ({ icon, label, onPress, amount: count, ...props }: TProps) => {
  const hasCount = count !== undefined && count > 0;

  return (
    <Styled.PillButton {...props} $hasCount={hasCount} inline onPress={onPress} radius>
      <>
        <Icon color={hasCount ? 'neutral.0' : 'primary.800'} name={icon} size={22} />
        <Styled.PillButtonLabel color={hasCount ? 'neutral.0' : 'primary.800'} size="small">
          {label}
        </Styled.PillButtonLabel>
        {hasCount && (
          <Styled.PillButtonAmount color="primary.800" fontStyle="bold">
            {count}
          </Styled.PillButtonAmount>
        )}
      </>
    </Styled.PillButton>
  );
};

export default PillButton;
