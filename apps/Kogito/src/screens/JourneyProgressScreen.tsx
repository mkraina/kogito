import React, {useCallback, useRef} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import type {Journey} from '../../gql/__generated__/graphql';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Hero from '../components/primitives/Hero';
import type {LevelWidgetVariant} from '../components/primitives/LevelWidget';
import LevelWidget from '../components/primitives/LevelWidget';
import Text from '../components/primitives/Text';
import {useContent} from '../modules/content/useContent';
import type {AppScreen} from '../navigation/Navigation';

const solveState = (
  unlocked: boolean,
  progress: number,
): LevelWidgetVariant => {
  if (unlocked) {
    return progress === 100 ? 'done' : 'inProgress';
  }

  return 'locked';
};

const colorFirst = (journey: Pick<Journey, 'id'> | undefined) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFCE8F';
  } else {
    return '#BF9BE8';
  }
};
const colorSecond = (journey: Pick<Journey, 'id'> | undefined) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFA38F';
  } else {
    return '#80A8D9';
  }
};

const JourneyProgressScreen: AppScreen<'JourneyProgress'> = ({navigation}) => {
  const scrollRef = useRef<ScrollView>(null);
  const {userJourney, refetch} = useContent();
  useFocusEffect(
    useCallback(() => {
      console.log('focus efetc');
      refetch();
    }, [refetch]),
  );

  return (
    <ColoredSafeAreaView
      angle={138}
      color1={colorFirst(userJourney)}
      color2={colorSecond(userJourney)}>
      <MainContainerWrapper>
        <MainHeader useTransparent={true} />
        <MainContainer page="dashboard">
          {userJourney && (
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
              <Hero
                state="onlyHeadline"
                title={userJourney.name}
                variant={
                  userJourney.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'
                }
              />
              <MainContainer page="sub">
                <View>
                  {userJourney.levels.map(level => {
                    return (
                      <LevelWidget
                        key={level.id}
                        name={`Úroveň ${level.level}`}
                        progress={level.progress}
                        state={solveState(level.unlocked, level.progress)}
                        onPress={() =>
                          navigation.navigate('Journey', {
                            id: userJourney.id,
                            level: level.level,
                          })
                        }
                      />
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={{marginBottom: 40, marginTop: 20}}
                  onPress={() => {
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: false,
                    });
                    navigation.navigate('JourneySwitch');
                  }}>
                  <Text align="center">Chci změnit cestu</Text>
                </TouchableOpacity>
              </MainContainer>
            </ScrollView>
          )}
        </MainContainer>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default JourneyProgressScreen;
