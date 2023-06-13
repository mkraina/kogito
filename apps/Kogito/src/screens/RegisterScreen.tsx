import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import LogoFooter from '../assets/login-logo-footer.svg';
import RegisterImg from '../assets/register-img.svg';
import MainContainer from '../components/container/MainContainer';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import type {AppScreen} from '../navigation/Navigation';

import {LogoFooterWrapper} from './LoginScreen';

export const RegisterImgWrapper = styled.View`
  margin-top: auto;
  margin-left: 49px;
  padding: 28px 0;
  flex: 1 1 auto;
  align-self: center;
`;

const RegisterScreen: AppScreen<'Register'> = () => {
  const navigation = useNavigation();
  return (
    <ColoredSafeAreaView>
      <MainContainer align="left">
        <Text textVariant="header">Jdeme na to</Text>
        <Text />
        <Text>
          Než se začneme věnovat tomu, jak Vaše myšlenky ovlivňují to, jak se
          cítíte a co prožíváte, tak potřebujeme blíže vědět, jak se teď cítíte.{' '}
        </Text>
        <Text />
        <Text>
          Na základě následujících dotazníků Vám dáme okamžitou zpětnou vazbu a
          nabídneme Vám odpovídající terapeutickou cestu.
        </Text>
        <LogoFooterWrapper>
          <LogoFooter />
        </LogoFooterWrapper>
        <Button
          title="Vyplnit dotazník"
          onPress={() => navigation.navigate('AvailableQuestionnaires')}
        />
        <RegisterImgWrapper>
          <RegisterImg />
        </RegisterImgWrapper>
      </MainContainer>
    </ColoredSafeAreaView>
  );
};

export default RegisterScreen;
