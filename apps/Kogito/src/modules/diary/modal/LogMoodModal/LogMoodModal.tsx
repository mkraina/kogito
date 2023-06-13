import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

import type {Mood} from '../../../../../gql/__generated__/graphql';
import EmoticoedHappy from '../../../../assets/emotions/happy.png';
import EmoticonOkay from '../../../../assets/emotions/okay.png';
import EmoticonSad from '../../../../assets/emotions/sad.png';
import EmoticonSatisfied from '../../../../assets/emotions/satisfied.png';
import EmoticonVerysad from '../../../../assets/emotions/verysad.png';
import Modal from '../../../../components/container/Modal/Modal';
import ModalEmoticon from '../../../../components/container/ModalEmoticon/ModalEmoticon';
import ButtonIcon from '../../../../components/primitives/ButtonIcon';
import Text from '../../../../components/primitives/Text';
import useEventListener from '../../../../helpers/useEventListener';
import useMixPanelTracking from '../../../../tracking/useMixPanelTracking';
import {useLogMood} from '../../useLogMood';

import S from './styles';

// eslint-disable-next-line max-lines-per-function, max-statements
const LogMoodModal: React.FC = () => {
  const logMoodMutation = useLogMood();
  const [visibility, setVisibility] = useState(false);
  const [showResult, setShowResult] = useState<Mood>();
  const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout>();
  const {trackEmotionEvaluated} = useMixPanelTracking();

  const {addListener, removeListener, fireEvent} = useEventListener();

  const logMood = async (mood: Mood) => {
    const result = await logMoodMutation({
      variables: {
        input: {
          mood,
        },
      },
    });

    trackEmotionEvaluated(
      mood,
      result.data?.logMood.last ? result.data.logMood.last : '',
    );
    setShowResult(mood);
    fireEvent('refetch-mood-list');

    setCloseTimer(
      setTimeout(() => {
        fireEvent('refetch-mood-list');
        setVisibility(false);
        setShowResult(undefined);
      }, 3000),
    );
  };

  const handleClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(undefined);
    }
    setVisibility(false);
  };

  useEffect(() => {
    const openFunction = () => {
      setShowResult(undefined);
      setVisibility(true);
    };

    addListener('open-log-mood', openFunction);

    return () => {
      removeListener(openFunction);
    };
  }, []);

  if (visibility) {
    // eslint-disable-next-line no-negated-condition
    return !showResult ? (
      <Modal close={() => setVisibility(false)}>
        <Text align="center" textVariant="bigHeader">
          Jak se cítíte?
        </Text>
        <Text align="center" textVariant="textMini">
          Zaznamejte svou náladu
        </Text>
        <S.EmoticonWrapper>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('SATISFIED')}>
              <Image source={EmoticonSatisfied} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('HAPPY')}>
              <Image source={EmoticoedHappy} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('OKAY')}>
              <Image source={EmoticonOkay} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('SAD')}>
              <Image source={EmoticonSad} />
            </ButtonIcon>
          </S.EmoticonItem>
          <S.EmoticonItem>
            <ButtonIcon onPress={() => logMood('VERYSAD')}>
              <Image source={EmoticonVerysad} />
            </ButtonIcon>
          </S.EmoticonItem>
        </S.EmoticonWrapper>
      </Modal>
    ) : (
      <ModalEmoticon close={handleClose} type={showResult} />
    );
  } else {
    return null;
  }
};

export default LogMoodModal;
