import React from 'react';
import { Text } from 'react-native';

import { Button, SafeAreaView } from '../_components';
import { useToggle } from '../_hooks';
import { useGetMe } from './_queries/useGetMe';
import LogoutModal from './LogOutModal';

const Profile = () => {
  const [logOutModalVisible, toggleLogOutModalVisible] = useToggle(false);
  const { data, isLoading } = useGetMe();
  console.log({ data, isLoading }); // @TODO: remove this console.log

  return (
    <>
      <SafeAreaView isScrollable>
        {/* @TODO: This is placeholder content */}
        <Text>This is the profile page</Text>
        <Button label="Logout" onPress={toggleLogOutModalVisible} />
      </SafeAreaView>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
    </>
  );
};

export default Profile;
