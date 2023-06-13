import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import S from './styles';

const ButtonIcon: React.FC<React.PropsWithChildren & TouchableOpacityProps> = ({
  children,
  ...rest
}) => {
  return (
    <S.Button {...rest}>
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 3, height: 6},
          shadowOpacity: 0.08,
          shadowRadius: 6,
        }}>
        <S.ButtonInner>{children}</S.ButtonInner>
      </DropShadow>
    </S.Button>
  );
};

export default ButtonIcon;
