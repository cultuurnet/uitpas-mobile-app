import React, { Fragment } from 'react';

import { RewardLoader, SkeletonLoader } from '../../../_components';
import * as Styled from './style';

type TProps = {
  horizontal?: boolean;
  showHeader?: boolean;
  skeletonKey: string;
};

export const RewardsSectionLoader = ({ horizontal, skeletonKey, showHeader = true }: TProps) => {
  return (
    <Styled.Container>
      {showHeader && (
        <Styled.Header>
          <SkeletonLoader
            dark
            layout={[{ height: 18, key: `${skeletonKey}-rewards-section-title`, marginBottom: 4, width: 140 }]}
          />
        </Styled.Header>
      )}

      {horizontal ? (
        <>
          <Styled.HorizontalLoaderContainer>
            <RewardLoader mode="tile" skeletonKey={`${skeletonKey}-rewards-section-horizontal-1`} />
            <Styled.HorizontalLoaderSeparator />
            <RewardLoader mode="tile" skeletonKey={`${skeletonKey}-rewards-section-horizontal-2`} />
          </Styled.HorizontalLoaderContainer>
        </>
      ) : (
        <>
          {[1, 2, 3].map(key => (
            <Fragment key={key}>
              <RewardLoader mode="list" skeletonKey={`${skeletonKey}-rewards-section-vertical-${key}`} />
              <Styled.Separator />
            </Fragment>
          ))}
        </>
      )}
    </Styled.Container>
  );
};
