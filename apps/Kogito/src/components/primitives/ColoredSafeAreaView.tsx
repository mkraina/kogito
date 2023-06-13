import React from 'react';
import {SafeAreaView} from 'react-native';

import GradientBackground from './GradientBackground';

type GradientProps = React.PropsWithChildren & {
  angle?: number;
  color1?: string;
  color2?: string;
};

const ColoredSafeAreaView: React.FC<GradientProps> = ({
  children,
  color1 = '#ffe7e7',
  color2 = '#fff3e7',
  angle = 148,
}) => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: color1}} />
      <SafeAreaView style={{flex: 1, backgroundColor: color2}}>
        <GradientBackground angle={angle} color1={color1} color2={color2}>
          {children}
        </GradientBackground>
      </SafeAreaView>
    </>
  );
};

export default ColoredSafeAreaView;
