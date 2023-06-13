import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import MainContainer from '../../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import BoxCheckbox from '../../components/primitives/BoxCheckbox/BoxCheckbox';
import BoxMediaWrapper from '../../components/primitives/BoxMediaWrapper/BoxMediaWrapper';
import GradientBackground from '../../components/primitives/GradientBackground';
import Hero from '../../components/primitives/Hero/Hero';
import RoadNavigation from '../../components/primitives/RoadNavigation/RoadNavigation';

const TodosScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground angle={138} color1="#ffd1a0" color2="#ffdfdf">
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page="dashboard">
            <Text>Todos</Text>
            <Hero state="mainInfo" />
            <BoxMediaWrapper>
              <RoadNavigation active="todos" />

              <BoxCheckbox checked={true} title="Plánuj své aktivity" />
              <BoxCheckbox title="Zaznamenávej si svůj stav" />
              <BoxCheckbox title="Zapisuj si myšlenky a pocity" />
              <BoxCheckbox title="Relaxuj" />
            </BoxMediaWrapper>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default TodosScreen;
