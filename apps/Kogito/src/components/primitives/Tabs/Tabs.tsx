import React from 'react';
import type {ViewProps} from 'react-native';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Border, Container, Link, ScrollViewInner, Text} from './styles';

type ContainerProps = ViewProps & {
  isActive?: boolean;
};

const Tabs: React.FC<ContainerProps> = ({isActive = false, ...rest}) => {
  const navigation = useNavigation();
  return (
    <Container {...rest}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ScrollViewInner>
          <Link onPress={() => navigation.navigate('Relaxation')}>
            <Text isActive={true}>Bojujte s depresí</Text>
            <Border isActive={true} />
          </Link>
          <Link onPress={() => navigation.navigate('RelaxationLocked')}>
            <Text isActive={isActive}>Jak se vyrovnat z úzkostí</Text>
            <Border isActive={isActive} />
          </Link>
        </ScrollViewInner>
      </ScrollView>
    </Container>
  );
};

export default Tabs;
