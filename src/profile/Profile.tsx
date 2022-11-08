import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '../_components';
import { useToggle } from '../_hooks';
import LogoutModal from './LogOutModal';

const Profile = () => {
  const [logOutModalVisible, toggleLogOutModalVisible] = useToggle(false);

  return (
    <SafeAreaView>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
      <ScrollView>
        {/* @TODO: This is placeholder content */}
        <Text>This is the profile page</Text>
        <Button label="Logout" onPress={toggleLogOutModalVisible} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
