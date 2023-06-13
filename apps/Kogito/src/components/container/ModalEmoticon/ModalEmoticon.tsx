import React from 'react';
import Moment from 'react-moment';
import type ReactNative from 'react-native';

import type {Mood} from '../../../../gql/__generated__/graphql';
import EmoticonHappy from '../../../assets/emotions/happy_big.png';
import ResultHappy from '../../../assets/emotions/happy_result.png';
import EmoticonOkay from '../../../assets/emotions/okay_big.png';
import ResultOkay from '../../../assets/emotions/okay_result.png';
import EmoticonSad from '../../../assets/emotions/sad_big.png';
import ResultSad from '../../../assets/emotions/sad_result.png';
import EmoticonSatisfied from '../../../assets/emotions/satisfied_big.png';
import ResultSatisfied from '../../../assets/emotions/satisfied_result.png';
import EmoticonVerysad from '../../../assets/emotions/verysad_big.png';
import ResultVerysad from '../../../assets/emotions/verysad_result.png';
import IconClose from '../../../assets/icon-cross.svg';
import Text from '../../primitives/Text';

import S from './styles';

type HalfOverlayProps = {
  type: Mood;
  close?: () => void;
} & ReactNative.ModalProperties;

type Settings = {
  icon: number;
  iconBig: number;
  title: string;
};

const getSettings = (type: HalfOverlayProps['type']): Settings => {
  switch (type) {
    case 'SATISFIED':
      return {
        title: 'Jsem velmi spokojená',
        icon: ResultSatisfied,
        iconBig: EmoticonSatisfied,
      };
    case 'HAPPY':
      return {
        title: 'Jsem spokojená',
        icon: ResultHappy,
        iconBig: EmoticonHappy,
      };
    case 'OKAY':
      return {
        title: 'Je mi jakž takž',
        icon: ResultOkay,
        iconBig: EmoticonOkay,
      };
    case 'SAD':
      return {
        title: 'Jsem smutná',
        icon: ResultSad,
        iconBig: EmoticonSad,
      };
    case 'VERYSAD':
      return {
        title: 'Jsem velmi smutná',
        icon: ResultVerysad,
        iconBig: EmoticonVerysad,
      };
  }
};

const ModalEmoticon: React.FC<HalfOverlayProps> = ({
  close = () => {},
  type,
  ...rest
}) => {
  const settings = getSettings(type);

  return (
    <S.Modal animationType="fade" transparent={true} {...rest}>
      <S.Close onPress={() => close()}>
        <IconClose />
      </S.Close>
      <S.ContainerWrap type={type}>
        <S.ContainerInner>
          <S.EmoticonBg source={settings.icon} />
          <S.EmoticonContent>
            <S.EmoticonImage source={settings.iconBig} />
            <Text align="center" textVariant="bigHeader">
              {settings.title}
            </Text>
            <Moment element={Text}>{new Date()}</Moment>
          </S.EmoticonContent>
          {/*<S.EmoticonButton>*/}
          {/*  <Text>Odstranit</Text>*/}
          {/*</S.EmoticonButton>*/}
        </S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default ModalEmoticon;
