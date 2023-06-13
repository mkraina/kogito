import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from '../../../assets/icon-chevron-left.svg';

import S from './styles';

type ContainerProps = {
  title: string;
  beforeBackButton?: () => Promise<void>;
};

const GoBack: React.FC<ContainerProps> = ({
  title,
  beforeBackButton,
  ...rest
}) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    await beforeBackButton?.();
    navigation.navigate('Dashboard');
  };

  return (
    <S.Container {...rest} onPress={handlePress}>
      <S.Wrapper>
        <Icon color="#1c1c1c" />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default GoBack;
