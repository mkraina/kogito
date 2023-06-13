import React from 'react';
import type ReactNative from 'react-native';

import IconCoin from '../../../assets/icon-coin.svg';

import {StyledButton, Text} from './styles';

type ButtonProps = {
  title: string;
} & ReactNative.TouchableOpacityProps;

const Coin: React.FC<ButtonProps> = ({title, ...rest}) => {
  return (
    <StyledButton {...rest}>
      <IconCoin />
      <Text>{title}</Text>
    </StyledButton>
  );
};

export default Coin;
