import React, { useEffect, useRef } from 'react';
import { Animated, LayoutAnimation, View } from 'react-native';

import { useToggle } from '../../_hooks';
import Icon from '../icon/Icon';
import * as Styled from './style';

export type TProps = {
  children: React.ReactNode;
  expandedTitle?: string;
  title: string;
};

const Accordion = ({ children, title, expandedTitle }: TProps) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const rotatingIconAnim = useRef(new Animated.Value(0));

  const rotatingIconDeg = rotatingIconAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    Animated.timing(rotatingIconAnim.current, {
      duration: 200,
      toValue: !expanded ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleExpanded();
  };

  return (
    <View accessibilityRole="menuitem" accessibilityState={{ expanded }}>
      {expanded && <Styled.Content>{children}</Styled.Content>}
      <Styled.Handle activeOpacity={0.8} onPress={handleToggle}>
        <Styled.Label color="primary.800" fontStyle="bold" size="small">
          {expanded ? expandedTitle || title : title}
        </Styled.Label>
        <Animated.View style={{ transform: [{ rotate: rotatingIconDeg }] }}>
          <Icon color="primary.800" name="ChevronUp" size={12} />
        </Animated.View>
      </Styled.Handle>
    </View>
  );
};

export default Accordion;
