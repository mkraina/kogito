import React from 'react';
import type ReactNative from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';

import S from './styles';

type HalfOverlayProps = {
  close: () => void | undefined;
} & ReactNative.ModalProperties;

const Modal: React.FC<HalfOverlayProps> = ({children, ...rest}) => {
  return (
    <S.Modal animationType="fade" transparent={true} {...rest}>
      <TouchableWithoutFeedback onPress={() => rest.close()}>
        <S.OpacityBackground />
      </TouchableWithoutFeedback>
      <S.ContainerWrap>
        <S.ContainerInner>{children}</S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default Modal;
