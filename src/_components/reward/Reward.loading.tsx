import React, { useCallback } from 'react';

import SkeletonLoader from '../skeletonLoader/SkeletonLoader';
import * as Styled from './style';

type TProps = {
  mode: 'list' | 'tile';
  skeletonKey: string;
};

const RewardLoader = ({ skeletonKey, mode, ...props }: TProps) => {
  const isTile = mode === 'tile';

  const renderPointsAndLabel = useCallback(
    () => (
      <Styled.PointsAndLabelContainer>
        <SkeletonLoader layout={[{ height: 16, key: `${skeletonKey}-reward-title`, width: 100 }]} />
      </Styled.PointsAndLabelContainer>
    ),
    [skeletonKey],
  );

  const Container = isTile ? Styled.RewardTileContainer : Styled.RewardListContainer;
  return (
    <Container {...props}>
      <>
        <Styled.ImageContainer isTile={isTile}>
          <SkeletonLoader
            dark
            layout={[
              {
                borderRadius: isTile ? 0 : 8,
                height: isTile ? 120 : 80,
                key: `${skeletonKey}-reward-image`,
                width: isTile ? 200 : 80,
              },
            ]}
          />
        </Styled.ImageContainer>
        <Styled.TextContainer isTile={isTile}>
          <SkeletonLoader
            layout={[
              { height: 16, key: `${skeletonKey}-reward-text-1`, marginBottom: 4, width: isTile ? 160 : 230 },
              { height: 16, key: `${skeletonKey}-reward-text-2`, marginBottom: 4, width: isTile ? 170 : 100 },
              {
                height: 14,
                key: `${skeletonKey}-reward-text-3`,
                marginBottom: isTile ? 20 : 0,
                marginTop: 4,
                width: isTile ? 100 : 160,
              },
            ]}
          />
          {!isTile && renderPointsAndLabel()}
        </Styled.TextContainer>
      </>
    </Container>
  );
};

export default RewardLoader;
