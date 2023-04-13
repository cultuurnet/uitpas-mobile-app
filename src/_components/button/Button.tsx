import { FC, ReactNode, useCallback, useState } from 'react';
import { Linking } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

export type TButtonPropsBase = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  centered?: boolean;
  children?: ReactNode;
  color?: ThemeColor;
  disabled?: boolean;
  fontStyle?: TTypographyProps['fontStyle'];
  hitSlop?: number;
  inline?: boolean;
  label?: string;
  loading?: boolean;
  radius?: boolean;
  underlayColor?: string;
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
  radius = true,
  onPress,
  href,
  label,
  variant = 'contained',
  color,
  underline = true,
  fontStyle = 'bold',
  inline,
  hitSlop,
  children,
  underlayColor,
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
      $radius={radius}
      $variant={variant}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      borderless={variant !== 'link'}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={handlePress}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      rippleColor={variant === 'link' && 'transparent'}
      underlayColor={variant !== 'link' && underlayColor}
      {...props}
    >
      {
        children ? (
          children
        ) : (
          <Styled.ButtonText
            $active={isActive}
            $color={color}
            $underline={underline}
            $variant={variant}
            align={props.centered ? 'center' : 'left'}
            fontStyle={fontStyle}
          >
            {label}
          </Styled.ButtonText >
        )
      }
    </Styled.ButtonElement >
  );
};

export default Button;
