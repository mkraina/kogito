import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Box from '../components/primitives/Box';
import BoxMedia from '../components/primitives/BoxMedia';
import BoxWrapper from '../components/primitives/BoxWrapper';
import Locked from '../components/primitives/Locked';
import TabbedBox from '../components/primitives/TabbedBox';
import Text from '../components/primitives/Text';
import images from '../helpers/images';
import {redirectItem} from '../helpers/redirectItem';
import {useContent} from '../modules/content/useContent';
import type {AppScreen} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

const RelaxationScreen: AppScreen<'Relaxation'> = ({navigation}) => {
  const {bonusRelaxation, journeyRelaxation} = useContent();
  const {trackRelaxationScreenOpened, trackRelaxationOpened} =
    useMixPanelTracking();

  useFocusEffect(
    useCallback(() => {
      trackRelaxationScreenOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer color="white" page="dashboard">
          <ScrollView>
            {/*<InputSearch />*/}
            <MainContainer page="sub">
              <Text textVariant="headerSub">Bonusová relaxace</Text>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                {bonusRelaxation.map(item => (
                  <Box
                    key={item.id}
                    img={images(
                      'bonusRelaxationOverview',
                      item.image ? item.image : null,
                    )}
                    isBonus={true}
                    isMedia={item.__typename === 'AudioItem'}
                    title={item.name}
                    onPress={() => {
                      trackRelaxationOpened(item.name, 'Bonus');
                      redirectItem(navigation, item);
                    }}
                  />
                ))}
              </BoxWrapper>
            </ScrollView>

            <TabbedBox
              headerVariant="headers"
              items={journeyRelaxation.map(journeyRelaxation => ({
                id: journeyRelaxation.id,
                label: journeyRelaxation.name,
                render: () => {
                  return journeyRelaxation.unlocked ? (
                    journeyRelaxation.relaxation.map(item => (
                      <BoxMedia
                        key={item.id}
                        isLocked={item.locked}
                        isPlayable={item.__typename === 'AudioItem'}
                        subTitle={item.subTitle}
                        title={item.name}
                        onPress={() => redirectItem(navigation, item)}
                      />
                    ))
                  ) : (
                    <Locked title="Nejprve dokončete předchozí cestu" />
                  );
                },
              }))}
            />
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default RelaxationScreen;
