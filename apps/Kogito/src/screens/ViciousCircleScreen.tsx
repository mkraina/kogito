import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {capitalize, groupBy} from 'lodash';
import moment from 'moment';

import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import DayInfoBox from '../components/primitives/DayInfoBox';
import Text from '../components/primitives/Text';
import {useTrackSchedule} from '../modules/content/useTrackSchedule';
import {useViciousCircleList} from '../modules/diary/useViciousCircleList';
import type {AppScreen} from '../navigation/Navigation';

const ViciousCircleScreen: AppScreen<'ViciousCircle'> = ({navigation}) => {
  const {records, refetch} = useViciousCircleList();
  // eslint-disable-next-line no-empty-pattern
  const {} = useTrackSchedule();

  const groupedRecords = useMemo(() => {
    const items = records.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index][0].date);

      return {
        title: capitalize(date.format('MMMM YYYY')),
        items: grouped[index],
      };
    });
  }, [records]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <Text
            space="main"
            textVariant="bigHeader"
            onPressPlus={() =>
              navigation.navigate('ViciousCircleEdit', {id: null})
            }>
            Kruhy
          </Text>

          {groupedRecords.map(item => (
            <React.Fragment key={item.title}>
              <Text colorVariant="gray" space="main" textVariant="headerSub2">
                {item.title}
              </Text>
              {item.items.map(entry => {
                console.log(entry.date);
                const date = new Date(entry.date);
                return (
                  <DayInfoBox
                    key={entry.id}
                    date={date}
                    title="Title"
                    onPress={() =>
                      navigation.navigate('ViciousCircleEdit', {id: entry.id})
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ViciousCircleScreen;
