import { FC, ReactNode, useState } from 'react';

import { theme } from '../../_styles/theme';
import Typography, { TTypographyProps } from '../typography/Typography';

export type TInlineLinkProps = Partial<TTypographyProps> & {
  children: ReactNode;
  href: string;
  onLinkPress: (href: string) => void;
};

const InlineLink: FC<TInlineLinkProps> = ({ children, href, onLinkPress, style, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Typography
      {...props}
      color="primary.800"
      onPress={() => onLinkPress(href)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      selectable
      style={[
        {
          opacity: isPressed ? 0.5 : 1,
          textDecorationColor: theme.palette.primary['700'],
          textDecorationLine: 'underline',
        },
        style,
      ]}
    >
      {children}
    </Typography>
  );
};

export default InlineLink;
