import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import MainContainer from '../../components/container/MainContainer';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import GradientBackground from '../../components/primitives/GradientBackground';
import Hero from '../../components/primitives/Hero';

const RoadRelaxationScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground angle={138} color1="#ffd1a0" color2="#ffdfdf">
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page="dashboard">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Hero state="mainInfo" />
              {/*<BoxMediaWrapper>*/}
              {/*  <RoadNavigation active={'relaxation'} />*/}

              {/*  <BoxMedia*/}
              {/*    title={'Jak začít'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia1}*/}
              {/*    state={'active'}*/}
              {/*    goTo={'Audio'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Techniky'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia2}*/}
              {/*    state={'active'}*/}
              {/*    goTo={'Audio'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Relaxace'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia3}*/}
              {/*    state={'locked'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Focus'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia4}*/}
              {/*    state={'locked'}*/}
              {/*  />*/}
              {/*</BoxMediaWrapper>*/}
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default RoadRelaxationScreen;
