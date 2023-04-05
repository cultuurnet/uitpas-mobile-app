import React, { Fragment } from 'react'

import { RewardLoader, SkeletonLoader } from '../../../_components';
import * as Styled from './style';

type TProps = {
  horizontal?: boolean;
}
export const RewardsSectionLoader = ({ horizontal }: TProps) => {
  return (
    <Styled.Container>
      <Styled.Header>
        <SkeletonLoader dark layout={[{ height: 18, marginBottom: 4, width: 140 }]} />
      </Styled.Header>

      {horizontal ? <>
        <Styled.HorizontalLoaderContainer>
          <RewardLoader mode='tile' />
          <Styled.HorizontalLoaderSeparator />
          <RewardLoader mode='tile' />
        </Styled.HorizontalLoaderContainer>
      </> : <>
        {[1, 2, 3].map((key) => (
          <Fragment key={key}>
            <RewardLoader mode='list' />
            <Styled.Separator />
          </Fragment>
        ))}
      </>}
    </Styled.Container>
  )
}
