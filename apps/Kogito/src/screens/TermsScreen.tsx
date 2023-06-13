import React, {useEffect} from 'react';
import {BackHandler, Image, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';

import Logo from '../assets/logo.png';
import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import terms from '../modules/user/data/terms';
import {useTerms} from '../modules/user/useTerms';
import type {AppScreen} from '../navigation/Navigation';

const TermsScreen: AppScreen<'Terms'> = ({navigation}) => {
  const {setSeenTerms, haveSeenTerms} = useTerms();

  useEffect(() => {
    if (haveSeenTerms) {
      navigation.replace('Login');
    }
  }, [haveSeenTerms]);

  const handleAgreePress = async () => {
    await setSeenTerms();
    navigation.replace('Login');
  };

  const handleDeclinePress = () => {
    BackHandler.exitApp();
  };

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="center">
            <Image source={Logo} />
            <HTML source={{html: terms}} />
            <Button
              style={{marginTop: -50}}
              title="Souhlasím"
              onPress={handleAgreePress}
            />
            <Button
              colorVariant="transparent"
              title="Ne"
              type="small"
              onPress={handleDeclinePress}
            />
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default TermsScreen;
