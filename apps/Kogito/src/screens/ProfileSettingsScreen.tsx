import React from 'react';
import {Alert, SafeAreaView, ToastAndroid, View} from 'react-native';
import {getReadableVersion} from 'react-native-device-info';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import Button from '../components/primitives/Button/Button';
import Divider from '../components/primitives/Divider';
import Text from '../components/primitives/Text';
import {ENV} from '../env';
import ProfileSettingsForm from '../modules/user/form/ProfileSettingsForm';
import type {AppScreen} from '../navigation/Navigation';

const ProfileSettingsScreen: AppScreen<'ProfileSettings'> = ({navigation}) => {
  const confirmLogoutModal = () => {
    Alert.alert('Doopravdy odhlásit?', undefined, [
      {
        text: 'Ne',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: () => navigation.navigate('Logout'),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <View>
            <Text textVariant="header">Profil</Text>

            <ProfileSettingsForm
              onSuccess={() =>
                ToastAndroid.show('Profil uložen', ToastAndroid.LONG)
              }
            />
            <Button
              style={{marginBottom: 10}}
              title="Chci změnit cestu"
              type="small"
              onPress={() => navigation.navigate('JourneySwitch')}
            />
            <Divider />
            <Button
              colorVariant="transparent"
              title="Odhlásit se"
              type="small"
              onPress={confirmLogoutModal}
            />
            <Text align="center" textVariant="textMini">
              Verze: {ENV.MODE[0]}
              {getReadableVersion()}
            </Text>
          </View>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
