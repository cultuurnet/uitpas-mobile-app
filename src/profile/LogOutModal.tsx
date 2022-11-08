import { FC } from 'react';
import { Modal, Text, View } from 'react-native';

type TLogOutModalProps = {
  isVisible: boolean;
};

const LogoutModal: FC<TLogOutModalProps> = ({ isVisible }) => {
  return (
    <Modal visible={isVisible}>
      <View>
        <Text> Dit is een test</Text>
      </View>
    </Modal>
  );
};

export default LogoutModal;
