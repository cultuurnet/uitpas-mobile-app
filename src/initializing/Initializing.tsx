import { Spinner } from '../_components';
import * as Styled from './style';

export const Initializing = () => (
  <Styled.Container>
    <Spinner statusBarStyle="dark" />
  </Styled.Container>
);
