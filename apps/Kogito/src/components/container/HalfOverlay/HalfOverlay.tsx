import React from 'react';
import type ReactNative from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import {ContainerInner, OutsideWrap, StyledModal} from './styles';

type HalfOverlayProps = {
  close: () => void | undefined;
} & ReactNative.ModalProperties;

const HalfOverlay: React.FC<HalfOverlayProps> = ({children, ...rest}) => {
  return (
    <StyledModal animationType="slide" transparent={true} {...rest}>
      <TouchableWithoutFeedback onPress={() => rest.close()}>
        <OutsideWrap />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <ContainerInner>{children}</ContainerInner>
      </KeyboardAvoidingView>
    </StyledModal>
  );
};

export default HalfOverlay;
