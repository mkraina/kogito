import React, {useCallback, useEffect, useMemo} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import {groupBy} from 'lodash';
import moment from 'moment';

import type {
  Mood,
  MoodCount,
  RemoveMoodRecordMutation,
  RemoveMoodRecordMutationVariables,
} from '../../gql/__generated__/graphql';
import EmoticonHappy from '../assets/emotions/happy.png';
import EmoticonOkay from '../assets/emotions/okay.png';
import EmoticonSad from '../assets/emotions/sad.png';
import EmoticonSatisfied from '../assets/emotions/satisfied.png';
import EmoticonVerysad from '../assets/emotions/verysad.png';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ButtonIcon from '../components/primitives/ButtonIcon';
import MoodRecord from '../components/primitives/MoodRecord/MoodRecord';
import Text from '../components/primitives/Text';
import useEventListener from '../helpers/useEventListener';
import {useMoodsList} from '../modules/diary/useMoodsList';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

const prepareCount = (items: MoodCount[], mood: Mood): number => {
  return items.find(item => item.mood === mood)?.count || 0;
};

const removeMoodRecordMutation = gql`
  mutation removeMoodRecord($id: ID!) {
    removeMoodRecord(id: $id)
  }
`;

const MoodListScreen: React.FC = () => {
  const {records, moodsCount, refetch} = useMoodsList();
  const {fireEvent, addListener, removeListener} = useEventListener();
  const [removeMoodRecord] = useMutation<
    RemoveMoodRecordMutation,
    RemoveMoodRecordMutationVariables
  >(removeMoodRecordMutation);
  const {trackEmotionTrackingOpened} = useMixPanelTracking();

  const groupedRecords = useMemo(() => {
    const items = records.map(item => {
      const date = new Date(item.date);

      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index][0].date);

      return {
        title: date.format('Do MMMM YYYY'),
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
          await removeMoodRecord({
            variables: {
              id,
            },
          });
          refetch();
        },
      },
    ]);
  };

  const pressAdd = () => {
    fireEvent('open-log-mood');
  };

  useEffect(() => {
    const handleRefetch = () => {
      refetch();
    };

    addListener('refetch-mood-list', handleRefetch);

    return () => {
      removeListener(handleRefetch);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      trackEmotionTrackingOpened();
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="subWithoutFooter">
            <Text textVariant="bigHeader" onPressPlus={pressAdd}>
              Hodnocení nálady
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 24,
              }}>
              <ButtonIcon disabled={true}>
                <Image source={EmoticonSatisfied} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'SATISFIED')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonHappy} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'HAPPY')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonOkay} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'OKAY')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonSad} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'SAD')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonVerysad} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'VERYSAD')}
                </Text>
              </ButtonIcon>
            </View>

            {groupedRecords.map(item => (
              <React.Fragment key={item.title}>
                <Text
                  colorVariant="gray"
                  style={{
                    marginTop: 20,
                    marginBottom: 8,
                  }}
                  textVariant="text600">
                  {item.title}
                </Text>
                {item.items.map(item => (
                  <MoodRecord
                    key={item.id}
                    type={item.mood}
                    onLongPress={() => handleLongPress(item.id)}>
                    {moment(item.date).format('HH:mm')}
                  </MoodRecord>
                ))}
              </React.Fragment>
            ))}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default MoodListScreen;
