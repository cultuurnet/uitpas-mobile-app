import { FC, ReactNode, useCallback, useState } from 'react';
import { Linking } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import Spinner from '../spinner/Spinner';
import { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

export type TButtonProps = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  centered?: boolean;
  children?: ReactNode;
  color?: ThemeColor;
  disabled?: boolean;
  fontStyle?: TTypographyProps['fontStyle'];
  hitSlop?: number;
  href?: string;
  inline?: boolean;
  label?: string;
  loading?: boolean;
  onPress?: () => void;
  radius?: boolean;
  underlayColor?: string;
  underline?: boolean;
  variant?: 'contained' | 'outline' | 'link';
};

const Button: FC<TButtonProps> = ({
  accessibilityHint,
  accessibilityLabel,
  disabled,
  radius = true,
  onPress,
  href,
  label,
  loading,
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
      onPress?.();
      await Linking.openURL(href);
    } else {
      // @TODO: error handling
    }
  }, [href, onPress]);

  const handlePress = href ? openURL : onPress;

  return (
    <Styled.ButtonElement
      $active={isActive}
      $color={color}
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
      loading={loading}
      onPress={handlePress}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      rippleColor={variant === 'link' && 'transparent'}
      underlayColor={variant !== 'link' && underlayColor}
      {...props}
    >
      {loading ? (
        <Spinner color={color || 'neutral.0'} fullScreen={false} size={24} />
      ) : children ? (
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
        </Styled.ButtonText>
      )}
    </Styled.ButtonElement>
  );
};

export default Button;
