import { FC, ReactNode, useCallback, useState } from 'react';

import { ThemeColor } from '../../_styles/theme';
import { openExternalURL } from '../../_utils';
import Spinner from '../spinner/Spinner';
import { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

export type TButtonProps = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  backgroundColor?: ThemeColor;
  centered?: boolean;
  children?: ReactNode;
  color?: ThemeColor;
  disabled?: boolean;
  fontSize?: TTypographyProps['size'];
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
  backgroundColor,
  underline = true,
  fontSize = 'normal',
  fontStyle = 'bold',
  inline,
  hitSlop,
  children,
  underlayColor,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const openURL = useCallback(async () => {
    await openExternalURL(href);
    onPress?.();
  }, [href, onPress]);

  const handlePress = href ? openURL : onPress;

  return (
    <Styled.ButtonElement
      $active={isActive}
      $backgroundColor={backgroundColor}
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
          size={fontSize}
        >
          {label}
        </Styled.ButtonText>
      )}
    </Styled.ButtonElement>
  );
};

export default Button;
