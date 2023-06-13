import React from 'react';
import type ReactNative from 'react-native';

import IconBack from '../../../assets/icon-chevron-left.svg';

import {StyledButton} from './styles';

export type ColorVariants = 'red' | 'white' | 'transparent';

type ButtonProps = {
  colorVariant?: ColorVariants;
} & ReactNative.TouchableOpacityProps;

const ButtonBack: React.FC<ButtonProps> = ({colorVariant = 'red', ...rest}) => {
  return (
    <StyledButton colorVariant={colorVariant} {...rest}>
      <IconBack color="#ca4233" />
    </StyledButton>
  );
};

export default ButtonBack;
