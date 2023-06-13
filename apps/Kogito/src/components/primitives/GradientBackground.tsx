import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type GradientProps = React.PropsWithChildren & {
  angle?: number;
  color1?: string;
  color2?: string;
};

const GradientBackground: React.FC<GradientProps> = ({
  children,
  color1 = '#ffe7e7',
  color2 = '#fff3e7',
  angle = 148,
}) => {
  return (
    <LinearGradient angle={angle} colors={[color1, color2]} useAngle={true}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
