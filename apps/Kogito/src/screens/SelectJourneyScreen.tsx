import React from 'react';
import {SafeAreaView} from 'react-native';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import JourneyBig from '../components/primitives/JourneyBig';
import Text from '../components/primitives/Text';
import {useSelectJourney} from '../modules/content/useSelectJourney';
import type {AppScreen} from '../navigation/Navigation';

const SelectJourneyScreen: AppScreen<'SelectJourneyScreen'> = ({
  navigation,
}) => {
  const {selectJourneyMutation} = useSelectJourney();

  const handleSelect = async (journeyId: string) => {
    await selectJourneyMutation({
      variables: {
        id: journeyId,
      },
    });

    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer color="white" page="dashboard">
          <MainContainer page="subWithoutFooter">
            <Text textVariant="bigHeader">Vyberte si svou cestu</Text>
            <JourneyBig
              title="Cesta deprese"
              variant="depression"
              onPress={() => handleSelect('Sm91cm5leTox')}
            />
            <JourneyBig
              title="Cesta úzkosti"
              variant="anxiety"
              onPress={() => handleSelect('Sm91cm5leToy')}
            />
          </MainContainer>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default SelectJourneyScreen;
