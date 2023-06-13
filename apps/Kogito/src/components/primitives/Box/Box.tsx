import React from 'react';
import DropShadow from 'react-native-drop-shadow';

import IconPlay from '../../../assets/icon-play.svg';

import {Container, Image, Text, TextWrapper, Wrapper} from './styles';

type ContainerProps = {
  img: number;
  isBonus?: boolean;
  isDisabled?: boolean;
  isMedia?: boolean;
  maxHeight?: boolean;
  onPress?: () => void;
  title?: string;
};

const Box: React.FC<ContainerProps> = ({
  title,
  img,
  isDisabled = false,
  isMedia = false,
  isBonus = false,
  onPress = () => {},
  maxHeight = false,
}) => {
  return (
    <Container onPress={onPress}>
      <DropShadow
        style={{
          shadowColor: '#666F8B',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 4},
          shadowRadius: 10,
        }}>
        <Wrapper isBonus={isBonus} isDisabled={isDisabled}>
          <Image source={img} style={maxHeight ? {height: 100} : {}} />
          <TextWrapper isBonus={isBonus}>
            <Text isBonus={isBonus}>{title}</Text>
            {isMedia && (
              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 3},
                  shadowOpacity: 0.16,
                  shadowRadius: 2,
                }}>
                <IconPlay style={{marginLeft: 4}} />
              </DropShadow>
            )}
          </TextWrapper>
        </Wrapper>
      </DropShadow>
    </Container>
  );
};

export default Box;
