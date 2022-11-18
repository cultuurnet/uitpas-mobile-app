import { FC, useCallback, useState } from 'react';
import { Linking } from 'react-native';

import * as Styled from './style';

export type TButtonPropsBase = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  centered?: boolean;
  disabled?: boolean;
  inline?: boolean;
  label: string;
  loading?: boolean;
  variant?: 'contained' | 'outline' | 'link';
};

type TButtonProps = TButtonPropsBase & {
  href?: never;
  onPress: () => void;
};

type TButtonLinkProps = TButtonPropsBase & {
  href: string;
  onPress?: never;
};

const Button: FC<TButtonProps | TButtonLinkProps> = ({
  accessibilityHint,
  accessibilityLabel,
  disabled,
  onPress,
  href,
  label,
  variant = 'contained',
  inline,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const openURL = useCallback(async () => {
    const supported = await Linking.canOpenURL(href);

    if (supported) {
      await Linking.openURL(href);
    } else {
      // @TODO: error handling
    }
  }, [href]);

  const handlePress = href ? openURL : onPress;

  return (
    <Styled.ButtonContainer inline={inline} {...props}>
      <Styled.ButtonElement
        $active={isActive}
        $inline={inline}
        $variant={variant}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={handlePress}
        onPressIn={() => setIsActive(true)}
        onPressOut={() => setIsActive(false)}
      >
        <Styled.ButtonText $active={isActive} $variant={variant} fontStyle="bold">
          {label}
        </Styled.ButtonText>
      </Styled.ButtonElement>
    </Styled.ButtonContainer>
  );
};

export default Button;
