import { Pressable } from 'react-native';

import { useToggle } from '../../_hooks';
import { useGetMe } from '../_queries/useGetMe';
import CardModal from './CardModal/CardModal';
import UitpasCard from './UitpasCard/UitpasCard';

export const UitpasCards = () => {
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const { data: passHolder } = useGetMe();

  return (
    <>
      <Pressable onPress={toggleCardModalVisible}>
        <UitpasCard passHolder={passHolder} />
      </Pressable>
      <CardModal isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} />
    </>
  );
};
