import * as Styled from './style';

export const ErrorIcon = () => {
  return (
    <Styled.Container type="error">
      <Styled.Label color="error.500" fontStyle="bold" size="large">
        !
      </Styled.Label>
    </Styled.Container>
  );
};
