import React from 'react';
import {useNavigation} from '@react-navigation/native';

import IconDots from '../../../assets/icon-dots.svg';
import IconMyDay from '../../../assets/icon-my-day.svg';
import IconRoad from '../../../assets/icon-road.svg';
import IconSun from '../../../assets/icon-sun.svg';
import IconTodo from '../../../assets/icon-todo.svg';

import {BorderTop, Button, Container, Text} from './styles';

export type Align = 'center' | 'left' | 'right' | 'between' | null;

type MainContainerProps = {
  align?: Align;
};

const MainFooter: React.FC<MainContainerProps> = ({align = null, ...rest}) => {
  const navigation = useNavigation();

  return (
    <Container align={align} {...rest}>
      <BorderTop />
      <Button onPress={() => navigation.navigate('Dashboard')}>
        <IconMyDay color="#8e8e93" />
        <Text>Můj den</Text>
      </Button>
      <Button onPress={() => navigation.navigate('JourneyProgress')}>
        <IconRoad color="#8e8e93" />
        <Text>Cesta</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Relaxation')}>
        <IconSun color="#8e8e93" />
        <Text>Relaxace</Text>
      </Button>
      <Button onPress={() => navigation.navigate('RoadTodos')}>
        <IconTodo color="#8e8e93" />
        <Text>Úkoly</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Signpost')}>
        <IconDots
          color="#8e8e93"
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
        <Text>Více</Text>
      </Button>
    </Container>
  );
};

export default MainFooter;
