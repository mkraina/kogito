import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader';
import Text from '../components/primitives/Text';
import ViciousCircle from '../components/primitives/ViciousCircle/VicousCircle';
import DetailViciousCircleModal from '../modules/diary/modal/DetailViciousCircleModal';
import EditViciousCircleModal from '../modules/diary/modal/EditViciousCircleModal';
import {useViciousCircle} from '../modules/diary/useViciousCircle';
import type {AppScreen, RootStackParamList} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

export type ViciousCircleEditProps = RouteProp<
  RootStackParamList,
  'ViciousCircleEdit'
>;

type Parts =
  | 'trigger'
  | 'negativeThoughts'
  | 'emotions'
  | 'physicalSymptoms'
  | 'behaviour';

const defaultData: Record<Parts, string[]> = {
  trigger: [],
  negativeThoughts: [],
  emotions: [],
  physicalSymptoms: [],
  behaviour: [],
};
type Data = typeof defaultData;

type EditData = {
  section: Parts;
  index?: number;
  initText?: string;
};

const modalText = (part: Parts) =>
  ({
    trigger: 'Zapsat spouštěč',
    negativeThoughts: 'Zapsat negativní myšlenky',
    emotions: 'Zapsat emoce',
    physicalSymptoms: 'Zapsat telěsné příznaky',
    behaviour: 'Zapsat chování',
  }[part]);

const ViciousCircleEditScreen: AppScreen<'ViciousCircleEdit'> = () => {
  const [data, setData] = useState<Data>(defaultData);
  const {trackViciousCycleOpened, trackViciousCycleEdited} =
    useMixPanelTracking();

  const [overview, setOverview] = useState<EditData | null>(null);
  const [editor, setEditor] = useState<EditData | null>(null);

  const {viciousCircle, save} = useViciousCircle();

  useEffect(() => {
    if (viciousCircle) {
      setData({
        trigger: viciousCircle.trigger,
        negativeThoughts: viciousCircle.negativeThoughts,
        emotions: viciousCircle.emotions,
        physicalSymptoms: viciousCircle.physicalSymptoms,
        behaviour: viciousCircle.behaviour,
      });
    } else {
      setData(defaultData);
    }
  }, [viciousCircle]);

  const handleItemSave = (newText: string) => {
    if (editor) {
      const tempData = {...data};

      if (editor.index) {
        tempData[editor.section][editor.index] = newText;
      } else {
        tempData[editor.section] = [...tempData[editor.section], newText];
      }

      setData(tempData);
      setEditor(null);
    }
  };
  const handleItemRemove = () => {
    if (editor && editor.index !== null) {
      const tempData = {...data};
      const tempSection = [...tempData[editor.section]];

      tempSection.splice(editor.index as number, 1);

      tempData[editor.section] = tempSection;

      setData(tempData);
      setEditor(null);
      setOverview(null);
    }
  };

  const openOverview = (part: Parts) => {
    if (data[part].length > 0) {
      setOverview({section: part});
    }
  };

  const handleSave = useCallback(async () => {
    if (viciousCircle) {
      try {
        await save({
          variables: {
            input: {
              id: viciousCircle.id,
              name: '',
              ...data,
            },
          },
        });
        trackViciousCycleEdited();
      } catch (e) {
        console.error({e});
      }
    }
  }, [viciousCircle, data, save]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const size =
    ((windowWidth > windowHeight ? windowHeight : windowWidth) * 0.2) / 2;

  useFocusEffect(
    useCallback(() => {
      trackViciousCycleOpened();

      const onBackPress = () => {
        handleSave().then();
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleSave]),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper color="white">
        <MainHeader beforeBackButton={handleSave} title={' '} />
        <MainContainer color="white" page="sub" style={{flexGrow: 0}}>
          <Text textVariant="bigHeader">Bludný kruh</Text>
          {viciousCircle && (
            <Text textVariant="textMini">
              {moment(viciousCircle.date).format('Do MMMM YYYY, HH:mm')}
            </Text>
          )}
        </MainContainer>
        <MainContainer align="center" page="withoutFooter">
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 54,
            }}>
            <ViciousCircle
              items={data.trigger}
              name="SPOUŠTĚČ/MAMUT"
              style={{
                marginLeft: size,
              }}
              onPress={() => setEditor({section: 'trigger'})}
              onPressCircle={() => openOverview('trigger')}
              onPressItem={(index, initText) =>
                setEditor({section: 'trigger', index, initText})
              }
            />
            <ViciousCircle
              items={data.negativeThoughts}
              name="AUTOMATICKÉ NEGATIVNÍ MYŠLENKY"
              onPress={() => setEditor({section: 'negativeThoughts'})}
              onPressCircle={() => openOverview('negativeThoughts')}
              onPressItem={(index, initText) =>
                setEditor({section: 'negativeThoughts', index, initText})
              }
            />
            <ViciousCircle
              items={data.emotions}
              name="EMOCE"
              onPress={() => setEditor({section: 'emotions'})}
              onPressCircle={() => openOverview('emotions')}
              onPressItem={(index, initText) =>
                setEditor({section: 'emotions', index, initText})
              }
            />
            <ViciousCircle
              items={data.physicalSymptoms}
              name="TĚLESNÉ PŘÍZNAKY"
              onPress={() => setEditor({section: 'physicalSymptoms'})}
              onPressCircle={() => openOverview('physicalSymptoms')}
              onPressItem={(index, initText) =>
                setEditor({section: 'physicalSymptoms', index, initText})
              }
            />
            <ViciousCircle
              items={data.behaviour}
              name="CHOVÁNÍ"
              style={{
                marginRight: size,
              }}
              onPress={() => setEditor({section: 'behaviour'})}
              onPressCircle={() => openOverview('behaviour')}
              onPressItem={(index, initText) =>
                setEditor({section: 'behaviour', index, initText})
              }
            />
          </ScrollView>
          <Text textVariant="textMini">Kliknutím nebo swipnutím</Text>

          {editor && (
            <EditViciousCircleModal
              close={() => setEditor(null)}
              initText={editor.initText ? editor.initText : ''}
              remove={handleItemRemove}
              save={handleItemSave}
              title={modalText(editor.section)}
            />
          )}

          {overview && (
            <DetailViciousCircleModal
              close={() => setOverview(null)}
              items={data[overview.section]}
              onPressItem={(index, initText) =>
                setEditor({section: overview.section, index, initText})
              }
            />
          )}
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ViciousCircleEditScreen;
