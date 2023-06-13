import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import MainContainer from '../../components/container/MainContainer';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import GradientBackground from '../../components/primitives/GradientBackground';
import Hero from '../../components/primitives/Hero';

const RoadToolsScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground angle={138} color1="#ffd1a0" color2="#ffdfdf">
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page="dashboard">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Hero state="mainInfo" />
              {/*<BoxMediaWrapper>*/}
              {/*  <RoadNavigation active={'tools'} />*/}

              {/*  <BoxMedia*/}
              {/*    title={'Plán dne'}*/}
              {/*    subTitle={'Naplánujte svůj den'}*/}
              {/*    goTo={'ScheduleDay'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Hodnocení nálady'}*/}
              {/*    subTitle={'Sledujte změny svých nálad'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Deník'}*/}
              {/*    subTitle={'Veďte si svůj osobní deník'}*/}
              {/*    goTo={'Diary'}*/}
              {/*  />*/}
              {/*</BoxMediaWrapper>*/}
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default RoadToolsScreen;
