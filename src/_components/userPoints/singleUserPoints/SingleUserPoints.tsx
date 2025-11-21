import { useToggle } from '../../../_hooks';
import { TPassHolder } from '../../../profile/_models';
import CardModal from '../../../profile/UitpasCards/CardModal/CardModal';
import Typography from '../../typography/Typography';
import * as Styled from './style';

type TProps = {
  passHolder: TPassHolder;
};

export const SingleUserPoints = ({ passHolder }: TProps) => {
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);

  const initials = `${passHolder.firstName?.[0] || ''}${passHolder.name?.[0] || ''}`;

  return (
    <>
      <Styled.Container activeOpacity={0.8} onPress={toggleCardModalVisible}>
        <Styled.Points allowFontScaling={false} fontStyle="bold" size="normal">
          {passHolder.points}
        </Styled.Points>
        {!!initials && (
          <Styled.Avatar>
            <Typography allowFontScaling={false} color="secondary.500" fontStyle="bold" size="xsmall">
              {initials}
            </Typography>
          </Styled.Avatar>
        )}
      </Styled.Container>
      <CardModal isVisible={cardModalVisible} passHolder={passHolder} toggleIsVisible={toggleCardModalVisible} />
    </>
  );
};
