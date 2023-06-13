import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import S from './styles';

type DetailViciousCircleModal = {
  close: () => void;
  items: string[];
  onPressItem: (index?: number, text?: string) => void;
};

const DetailViciousCircleModal: React.FC<DetailViciousCircleModal> = ({
  items,
  close,
  onPressItem,
}) => {
  console.log({items});
  return (
    <S.Modal animationType="fade" transparent={true} onRequestClose={close}>
      <TouchableWithoutFeedback onPress={() => close()}>
        <S.OpacityBackground />
      </TouchableWithoutFeedback>
      <S.ContainerWrap>
        <S.ContainerInner>
          <S.ItemContainer>
            {items.map((item, index) => (
              <S.ItemWrapper key={item}>
                <S.Item onPress={() => onPressItem(index, item)}>{item}</S.Item>
              </S.ItemWrapper>
            ))}
          </S.ItemContainer>
        </S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default DetailViciousCircleModal;
