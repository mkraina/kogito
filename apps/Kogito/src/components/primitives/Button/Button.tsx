import React from 'react';
import type ReactNative from 'react-native';

import {ButtonInnerText, StyledButton} from './styles';

export type ColorVariants =
  | 'red'
  | 'white'
  | 'transparent'
  | 'transparentBlack'
  | 'orange';
export type Type = 'small' | 'medium' | 'large' | null;

type ButtonProps = {
  title: string;
  colorVariant?: ColorVariants;
  type?: Type;
} & ReactNative.TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({
  colorVariant = 'red',
  title,
  type = 'large',
  ...rest
}) => {
  return (
    <StyledButton colorVariant={colorVariant} type={type} {...rest}>
      <ButtonInnerText colorVariant={colorVariant} type={type}>
        {title}
      </ButtonInnerText>
    </StyledButton>
  );
};

export default Button;
