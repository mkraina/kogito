/* eslint-disable no-lone-blocks */
import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';

import MainContainerWrapper from '../components/container/MainContainerWrapper';
import BoxJourney from '../components/primitives/BoxJourney';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import {useSwitchJourney} from '../modules/content/useSwitchJourney';
import {useRegistrationStatus} from '../modules/user/useRegistrationStatus';
import type {AppScreen} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

const S = {
  HeadlineContainer: styled.View`
    margin-top: 85px;
  `,
  Headline: styled.Text`
    font-weight: 500;
    font-size: 18px;
    line-height: 21;
    color: #3a2121;
    text-align: center;
  `,
  BoxWrapper: styled.ScrollView`
    margin-top: 72px;
    margin-left: 10px;
    margin-right: 10px;
  `,
};

const rawTexts = [
  {
    labels: ['Va', 'Vb', 'Vc', 'Vd'],
    id: 'Sm91cm5leTox',
    name: 'Deprese',
    description:
      'Naučíme Vás jak pracovat s myšlenkami, které vedou k depresivní náladě. Osvojíte si relaxační techniky a poznáte příběhy jiných žen.',
  },
  {
    labels: ['Va', 'Vd', 'Ve', 'Vf'],
    id: 'Sm91cm5leToy',
    name: 'Úzkost',
    description:
      'Naučíme Vás jak pracovat s myšlenkami, které vedou k úzkosti. Osvojíte si relaxační techniky a poznáte příběhy jiných žen.',
  },
];

const JourneySwitchScreen: AppScreen<'JourneySwitch'> = ({navigation}) => {
  const {status} = useRegistrationStatus();
  const {switchJourneyMutation} = useSwitchJourney();

  const {trackSwitchJourneyScreenOpened, trackSwitchJourney} =
    useMixPanelTracking();

  const ids = [];

  if (status) {
    if (rawTexts[0].labels.includes(status.userLabel)) {
      ids.push('Sm91cm5leTox');
      console.log('a');
    }

    if (rawTexts[1].labels.includes(status.userLabel)) {
      ids.push('Sm91cm5leToy');
      console.log('b');
    }
  }

  if (!ids.includes('Sm91cm5leTox')) {
    ids.push('Sm91cm5leTox');
  }
  if (!ids.includes('Sm91cm5leToy')) {
    ids.push('Sm91cm5leToy');
  }

  const texts = ids.map(id => {
    return rawTexts.find(text => text.id === id);
  });

  useFocusEffect(
    useCallback(() => {
      trackSwitchJourneyScreenOpened();
    }, []),
  );

  return (
    <ColoredSafeAreaView angle={138} color1="#FFCE8F" color2="#FFA38F">
      <MainContainerWrapper>
        <S.HeadlineContainer>
          <S.Headline>Vyberte jednu z cest</S.Headline>
        </S.HeadlineContainer>
        <S.BoxWrapper>
          {texts.map(
            (textData, index) =>
              textData && (
                <BoxJourney
                  key={textData.id}
                  description={textData.description}
                  highlighted={index === 0}
                  index={index + 1}
                  title={textData.name}
                  onClick={() => {
                    trackSwitchJourney(textData.id);
                    switchJourneyMutation({
                      variables: {
                        id: textData.id,
                      },
                    }).then(() => {
                      navigation.navigate('Dashboard');
                    });
                  }}
                />
              ),
          )}
        </S.BoxWrapper>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default JourneySwitchScreen;

{
  /*{texts.map((textData) => (*/
}
{
  /*    <S.BoxWrapper>*/
}
{
  /*      <BoxJourney*/
}
{
  /*          index={1}*/
}
{
  /*          title={textData.name}*/
}
{
  /*          description={textData.description}*/
}
{
  /*          highlighted={true}*/
}
{
  /*          onClick={() =>*/
}
{
  /*              switchJourneyMutation({*/
}
{
  /*                variables: {*/
}
{
  /*                  id: '',*/
}
{
  /*                },*/
}
{
  /*              })*/
}
{
  /*          }*/
}
{
  /*      />*/
}
{
  /*))}*/
}

{
  /*<Button*/
}
{
  /*  onPress={() =>*/
}
{
  /*    switchJourneyMutation({*/
}
{
  /*      variables: {*/
}
{
  /*        id: 'Sm91cm5leTox',*/
}
{
  /*      },*/
}
{
  /*    })*/
}
{
  /*  }*/
}
{
  /*  title="Zmenit na depresi"*/
}
{
  /*/>*/
}
{
  /*<Button*/
}
{
  /*  onPress={() =>*/
}
{
  /*    switchJourneyMutation({*/
}
{
  /*      variables: {*/
}
{
  /*        id: 'Sm91cm5leToy',*/
}
{
  /*      },*/
}
{
  /*    })*/
}
{
  /*  }*/
}
{
  /*  title="Zmenit na uzkost"*/
}
{
  /*/>*/
}
