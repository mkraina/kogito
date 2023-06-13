import React from 'react';
import Moment from 'react-moment';
import {View} from 'react-native';

import Woman from '../../../assets/woman-2.svg';
import Button from '../Button';

import {Container, ContainerInner, Text, Title} from './styles';

type BoxBigProps = {
  buttonText: string;
  date: Date;
  title: string;
  onPress?: () => void;
};

const BoxBig: React.FC<BoxBigProps> = ({
  title,
  buttonText,
  date,
  onPress = () => {},
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Woman
        style={{
          position: 'absolute',
          bottom: -32,
          right: -24,
        }}
      />
      <ContainerInner>
        <Title>{title}</Title>
        <Moment element={Text}>{date}</Moment>
        <View>
          <Button
            colorVariant="red"
            title={buttonText}
            type="small"
            onPress={onPress}
          />
        </View>
      </ContainerInner>
    </Container>
  );
};

export default BoxBig;
