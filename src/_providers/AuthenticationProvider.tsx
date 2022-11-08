import { FC, PropsWithChildren } from 'react';
import { Auth0Provider } from 'react-native-auth0';
import { Config } from 'react-native-config';

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Auth0Provider clientId={Config.REACT_NATIVE_APP_AUTH0_CLIENT_ID} domain={Config.REACT_NATIVE_APP_AUTH0_DOMAIN}>
      {children}
    </Auth0Provider>
  );
};

export default AuthenticationProvider;
