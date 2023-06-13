import React from 'react';
import type ReactNative from 'react-native';

import S from './styles';

type TextArea = ReactNative.TextInputProps;

const TextArea: React.FC<TextArea> = ({...rest}) => {
  return (
    <S.Container>
      <S.StyledTextArea
        multiline={true}
        placeholder="Zapiš si myšlenky, emoce a příznaky"
        placeholderTextColor="grey"
        textAlignVertical="top"
        underlineColorAndroid="transparent"
        {...rest}
      />
    </S.Container>
  );
};

export default TextArea;
