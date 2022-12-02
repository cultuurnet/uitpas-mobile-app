import { FC, useCallback, useState } from 'react';
import { Linking } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

export type TButtonPropsBase = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  centered?: boolean;
  color?: ThemeColor;
  disabled?: boolean;
  fontStyle?: TTypographyProps['fontStyle'];
  inline?: boolean;
  label: string;
  loading?: boolean;
  underline?: boolean;
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
  color,
  underline = true,
  fontStyle = 'bold',
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
      {...props}
    >
      <Styled.ButtonText
        $active={isActive}
        $color={color}
        $underline={underline}
        $variant={variant}
        align={props.centered ? 'center' : 'left'}
        fontStyle={fontStyle}
      >
        {label}
      </Styled.ButtonText>
    </Styled.ButtonElement>
  );
};

export default Button;
