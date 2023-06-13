import React from 'react';
import {View} from 'react-native';

import HeroAnxiety from '../../../assets/anxiety/hero.svg';
import HeroDepression from '../../../assets/depression/hero.svg';
import Button from '../Button';

import {Container, ContainerInner, Title} from './styles';

export type ImageVariant = 'depression' | 'anxiety';
type BoxBigProps = {
  title: string;
  variant: ImageVariant;
  onPress?: () => void;
};

const JourneyBig: React.FC<BoxBigProps> = ({
  title,
  onPress = () => {},
  variant,
}) => {
  return (
    <Container background={variant === 'depression' ? '#FFCE8F' : '#BF9BE8'}>
      {variant === 'depression' && (
        <HeroDepression
          style={{
            position: 'absolute',
            bottom: -30,
            right: 5,
          }}
        />
      )}
      {variant === 'anxiety' && (
        <HeroAnxiety
          style={{
            position: 'absolute',
            bottom: -100,
            right: 5,
          }}
        />
      )}
      <ContainerInner>
        <Title>{title}</Title>
        <View>
          <Button
            colorVariant="red"
            title="Zvolit"
            type="small"
            onPress={onPress}
          />
        </View>
      </ContainerInner>
    </Container>
  );
};

export default JourneyBig;
