import React from 'react'

import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  icon: TIconName;
  label: string;
  onPress: () => void;
};

const PillButton = ({ icon, label, onPress, ...props }: TProps) => {
  return (
    <Styled.PillButton {...props} inline onPress={onPress} radius>
      <>
        <Icon color="primary.800" name={icon} size={22} />
        <Styled.PillButtonLabel color="primary.800" size="small">{label}</Styled.PillButtonLabel>
      </>
    </Styled.PillButton>
  );
}

export default PillButton;