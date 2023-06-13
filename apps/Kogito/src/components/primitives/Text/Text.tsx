import React from 'react';
import type ReactNative from 'react-native';
import {TouchableOpacity} from 'react-native';

import IconPlus from '../../../assets/icon-plus.svg';

import S from './styles';

export type TextVariant =
  | 'bigHeader'
  | 'leftBigHeader'
  | 'header'
  | 'text'
  | 'questionNumber'
  | 'headerSub'
  | 'headerSub2'
  | 'textSmall'
  | 'text600'
  | 'textMini'
  | 'textCopy';
export type ColorVariant = 'gray' | 'main' | null;
export type Align = 'right' | 'center' | 'left' | null;
export type Space = 'main' | 'mainY' | null;

type TextProps = {
  add?: boolean;
  align?: Align;
  colorVariant?: ColorVariant;
  goTo?: string;
  onPressPlus?: () => void;
  space?: Space;
  textVariant?: TextVariant;
} & ReactNative.TextProps;

const Text: React.FC<TextProps> = ({
  textVariant = 'text',
  colorVariant = null,
  align = null,
  space = null,
  add = null,
  children,
  onPressPlus,
  ...rest
}) => {
  return (
    <S.Container align={align} space={space} {...rest}>
      <S.StyledText
        add={add}
        colorVariant={colorVariant}
        textVariant={textVariant}>
        {children}
      </S.StyledText>
      {onPressPlus && (
        <TouchableOpacity
          style={{
            padding: 15,
          }}
          onPress={onPressPlus}>
          <IconPlus />
        </TouchableOpacity>
      )}
    </S.Container>
  );
};

export default Text;
