import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '../_components';
import { useAuthentication } from '../_context/AuthenticationProvider';

const Profile = () => {
  const { logout } = useAuthentication();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // @TODO: general error handling?
      console.error(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* @TODO: This is placeholder content */}
        <Text>This is the profile page</Text>
        <Button label="Logout" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
