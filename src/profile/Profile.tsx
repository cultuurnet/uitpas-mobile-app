import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

import { Button } from '../_components';

const Profile = () => {
  const { clearSession } = useAuth0();

  const handleLogout = async () => {
    try {
      await clearSession();
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
