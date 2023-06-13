import React from 'react';
import type {ViewProps} from 'react-native';
import {useWindowDimensions} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import IconPlus from '../../../assets/icon-plus.svg';

import S from './styles';

type ViciousCircle = ViewProps & {
  items: string[];
  name: string;
  onPress: () => void;
  onPressCircle: () => void;
  onPressItem: (index?: number, text?: string) => void;
};

const ViciousCircle: React.FC<ViciousCircle> = ({
  name,
  items,
  onPress,
  onPressCircle,
  onPressItem,
  ...rest
}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const size = (windowWidth > windowHeight ? windowHeight : windowWidth) * 0.8;

  return (
    <S.Container
      disabled={items.length === 0}
      size={size}
      onPress={onPressCircle}
      {...rest}>
      <S.Circle size={size}>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 80,
            backgroundColor: '#ffffff',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <S.CircleInner size={size}>
            <DropShadow
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 20,
                backgroundColor: '#ffffff',
                width: '100%',
                height: '100%',
              }}>
              <S.CircleInnerWrapper>
                {items.map((item, index) => (
                  <S.ItemWrapper key={item}>
                    <S.Item onPress={() => onPressItem(index, item)}>
                      {item}
                    </S.Item>
                  </S.ItemWrapper>
                ))}
                <S.ButtonAdd onPress={onPress}>
                  <IconPlus />
                </S.ButtonAdd>
              </S.CircleInnerWrapper>
            </DropShadow>
          </S.CircleInner>
        </DropShadow>
      </S.Circle>
      <S.Text>{name}</S.Text>
    </S.Container>
  );
};

export default ViciousCircle;
