import React, {useCallback, useMemo} from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {capitalize, groupBy} from 'lodash';
import moment from 'moment';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import DayInfoBox from '../components/primitives/DayInfoBox';
import Text from '../components/primitives/Text';
import {useDiaryEntry} from '../modules/diary/useDiaryEntry';
import {useDiaryList} from '../modules/diary/useDiaryList';
import type {AppScreen} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

const DiaryScreen: AppScreen<'Diary'> = ({navigation}) => {
  const {records, refetch} = useDiaryList();
  const {removeDiaryEntry} = useDiaryEntry(null);
  const {trackJournalOpened} = useMixPanelTracking();

  const groupedRecords = useMemo(() => {
    // preparing grouping parameter
    const items = records.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    // preparing array for printing - title and items
    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index][0].date);
      return {
        title: capitalize(date.format('MMMM YYYY')),
        items: grouped[index],
      };
    });
  }, [records]);

  const handleLongPress = (id: string) => {
    Alert.alert('Smazat', 'Doopravdy chcete smazat záznam?', [
      {
        text: 'Ne',
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: async () => {
          await removeDiaryEntry({
            variables: {
              id,
            },
          });
          refetch();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      trackJournalOpened();
      console.log('REFETCH');
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="dashboard">
            <Text
              space="main"
              textVariant="bigHeader"
              onPressPlus={() => navigation.navigate('DiaryEdit', {id: null})}>
              Deník
            </Text>

            {groupedRecords.map(item => (
              <React.Fragment key={item.title}>
                <Text colorVariant="gray" space="main" textVariant="headerSub2">
                  {item.title}
                </Text>
                {item.items.map(entry => {
                  const date = new Date(entry.date);
                  return (
                    <DayInfoBox
                      key={entry.id}
                      date={date}
                      title={entry.previewText}
                      onLongPress={() => handleLongPress(entry.id)}
                      onPress={() =>
                        navigation.navigate('DiaryEdit', {id: entry.id})
                      }
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default DiaryScreen;
