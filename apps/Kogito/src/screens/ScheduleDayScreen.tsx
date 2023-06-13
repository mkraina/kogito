import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import BoxCheckbox from '../components/primitives/BoxCheckbox';
import Text from '../components/primitives/Text';
import {useContent} from '../modules/content/useContent';
import {useTrackSchedule} from '../modules/content/useTrackSchedule';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

const ScheduleDayScreen: React.FC = () => {
  const {todaySchedule} = useContent();
  const {trackScheduleMutation} = useTrackSchedule();
  const {trackDayPlannerOpened} = useMixPanelTracking();

  const handleChange = async (id: string, checked: boolean) => {
    try {
      console.log(id, checked);
      await trackScheduleMutation({
        variables: {
          input: {
            id,
            checked,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      trackDayPlannerOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="subWithoutFooter">
            <Text add={true} textVariant="bigHeader">
              Plán dne
            </Text>

            <Text colorVariant="gray" textVariant="headerSub2" />
            {todaySchedule?.morning.map(item => (
              <BoxCheckbox
                key={item.id}
                checked={item.completed}
                title={item.name}
                onChange={value => handleChange(item.id, value)}
              />
            ))}

            {/*<Text textVariant={'headerSub2'} colorVariant={'gray'}>*/}
            {/*  Odpoledne*/}
            {/*</Text>*/}
            {/*{todaySchedule &&*/}
            {/*  todaySchedule.afternoon.map((item) => (*/}
            {/*    <BoxCheckbox*/}
            {/*      title={item.name}*/}
            {/*      checked={item.completed}*/}
            {/*      onChange={(value) => handleChange(item.id, value)}*/}
            {/*    />*/}
            {/*  ))}*/}

            {/*<Text textVariant={'headerSub2'} colorVariant={'gray'}>*/}
            {/*  Večer*/}
            {/*</Text>*/}
            {/*{todaySchedule &&*/}
            {/*  todaySchedule.evening.map((item) => (*/}
            {/*    <BoxCheckbox*/}
            {/*      title={item.name}*/}
            {/*      checked={item.completed}*/}
            {/*      onChange={(value) => handleChange(item.id, value)}*/}
            {/*    />*/}
            {/*  ))}*/}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ScheduleDayScreen;
