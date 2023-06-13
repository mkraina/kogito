import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useApolloClient} from '@apollo/client';

import {useAuth} from '../modules/auth/useAuth';
import type {AppScreen} from '../navigation/Navigation';

const LogoutScreen: AppScreen<'Logout'> = ({navigation}) => {
  const {clearTokens} = useAuth();
  const apolloClient = useApolloClient();

  useEffect(() => {
    (async () => {
      await apolloClient.clearStore();
      await apolloClient.resetStore();

      await clearTokens();

      navigation.replace('Login');
    })();
  }, []);

  return <SafeAreaView />;
};

export default LogoutScreen;
