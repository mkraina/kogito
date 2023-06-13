import React from 'react';
import {useNavigation} from '@react-navigation/native';

import IconUser from '../../../assets/icon-user.svg';
import GoBack from '../../primitives/GoBack';

import S from './styles';

export type Align = 'left' | 'right';
export type BgColor = 'transparent';

type MainContainerProps = {
  beforeBackButton?: () => Promise<void>;
  title?: string;
  useTransparent?: boolean;
};

const MainHeader: React.FC<MainContainerProps> = ({
  title,
  useTransparent = false,
  beforeBackButton,
  // ...rest
}) => {
  const navigation = useNavigation();

  return (
    <S.Container bgColor={useTransparent ? 'transparent' : undefined}>
      {title ? (
        <GoBack beforeBackButton={beforeBackButton} title={title} />
      ) : (
        <IconUser onPress={() => navigation.navigate('ProfileSettings')} />
      )}
      {/* NOT USED NOW */}
      {/*<Coin title={'132'} />*/}
    </S.Container>
  );
};

export default MainHeader;
