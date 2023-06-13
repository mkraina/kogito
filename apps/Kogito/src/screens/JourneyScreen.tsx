import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack/src/types';

import type {Journey} from '../../gql/__generated__/graphql';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import BoxMedia from '../components/primitives/BoxMedia';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Hero from '../components/primitives/Hero/Hero';
import TabbedBox from '../components/primitives/TabbedBox/TabbedBox';
import {redirectItem} from '../helpers/redirectItem';
import type {ContentItem} from '../modules/content/types';
import {useJourney} from '../modules/content/useJourney';
import type {
  AppScreen,
  DashboardStackParamList,
} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

type Items = {
  items: Omit<ContentItem, 'content'>[];
  level: number;
  navigation: StackNavigationProp<any, any>;
  type?: string;
};

type RoadPhaseNavigationProp = RouteProp<DashboardStackParamList, 'Journey'>;

const Items: React.FC<Items> = ({type, level, items, navigation}) => {
  const {trackRelaxationOpened, trackLessonOpened} = useMixPanelTracking();

  const trackAndRedirect = (item: Items['items'][0]) => {
    redirectItem(navigation, item);
    switch (type) {
      case 'lesson':
        return trackLessonOpened(item.name, level);
      case 'relaxation':
        return trackRelaxationOpened(item.name, level);
    }
  };

  return (
    <>
      {items.map(item => (
        <BoxMedia
          key={item.id}
          isCompleted={(item.progress || 0) >= 80}
          isLocked={item.locked}
          isPlayable={
            item.__typename === 'AudioItem' || item.__typename === 'VideoItem'
          }
          subTitle={item.subTitle}
          title={item.name}
          onPress={() => trackAndRedirect(item)}
        />
      ))}
    </>
  );
};

const colorFirst = (journey: Pick<Journey, 'id'> | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFCE8F';
  } else {
    return '#BF9BE8';
  }
};
const colorSecond = (journey: Pick<Journey, 'id'> | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFA38F';
  } else {
    return '#80A8D9';
  }
};

const JourneyScreen: AppScreen<'Journey'> = ({navigation}) => {
  const route = useRoute<RoadPhaseNavigationProp>();
  const {journey, refetch} = useJourney(route.params.id);

  useFocusEffect(
    useCallback(() => {
      console.log('focus efetc');
      refetch();
    }, [refetch]),
  );

  if (!journey) {
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  }

  const selectedLevel = journey.levels.find(
    level => level.level === route.params.level,
  );

  if (!selectedLevel) {
    return (
      <SafeAreaView>
        <Text>ERROR</Text>
      </SafeAreaView>
    );
  }

  return (
    <ColoredSafeAreaView
      angle={138}
      color1={colorFirst(journey)}
      color2={colorSecond(journey)}>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer page="dashboard">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Hero
              progress={selectedLevel.progress}
              state="mainInfo"
              subTitle={`Úroveň ${selectedLevel.level}`}
              title={journey.name}
              variant={journey.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'}
            />
            <TabbedBox
              items={[
                {
                  label: 'Etapa',
                  id: `${selectedLevel.level}_phase`,
                  render: () => (
                    <Items
                      items={selectedLevel.phase}
                      level={selectedLevel.level}
                      navigation={navigation}
                      type="lesson"
                    />
                  ),
                },
                {
                  label: 'Nástroje',
                  id: `${selectedLevel.level}_tools`,
                  render: () => (
                    <Items
                      items={selectedLevel.tools}
                      level={selectedLevel.level}
                      navigation={navigation}
                    />
                  ),
                },
                {
                  label: 'Relaxace',
                  id: `${selectedLevel.level}_relaxation`,
                  render: () => (
                    <Items
                      items={selectedLevel.relaxation}
                      level={selectedLevel.level}
                      navigation={navigation}
                      type="relaxation"
                    />
                  ),
                },
                {
                  label: 'Úkoly',
                  id: `${selectedLevel.level}_tasks`,
                  render: () => (
                    <Items
                      items={selectedLevel.tasks}
                      level={selectedLevel.level}
                      navigation={navigation}
                    />
                  ),
                },
              ]}
            />
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default JourneyScreen;
