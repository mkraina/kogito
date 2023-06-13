import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import {useAuth} from '../modules/auth/useAuth';
import {useMeQuery} from '../modules/user/useMeQuery';
import {useTerms} from '../modules/user/useTerms';
import type {AppScreen} from '../navigation/Navigation';

const SplashScreen: AppScreen<'Splash'> = ({navigation}) => {
  const {status} = useAuth();
  const {haveSeenTerms} = useTerms();
  const {me, haveActiveQuestionnaire} = useMeQuery();

  // eslint-disable-next-line @shopify/prefer-early-return
  useEffect(() => {
    if (status === 'unauthenticated') {
      if (haveSeenTerms) {
        navigation.replace('Login');
      } else {
        navigation.replace('Terms');
      }

      BootSplash.hide();
    }
  }, [status]);

  // eslint-disable-next-line @shopify/prefer-early-return
  useEffect(() => {
    if (me) {
      console.log(me);
      if (haveActiveQuestionnaire) {
        navigation.replace('AfterMonthQuestionnaire');
        // eslint-disable-next-line no-negated-condition
      } else if (!me.finishedRegistration) {
        navigation.replace('Registration');
      } else {
        navigation.replace('Dashboard');
      }

      BootSplash.hide();
    }
  }, [me]);

  return <SafeAreaView />;
};

export default SplashScreen;
