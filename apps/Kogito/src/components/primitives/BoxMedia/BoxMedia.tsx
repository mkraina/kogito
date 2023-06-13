import React from 'react';
import DropShadow from 'react-native-drop-shadow';

import IconLocked from '../../../assets/icon-locked.svg';
import IconPlay from '../../../assets/icon-play.svg';

import S from './styles';

type ContainerProps = {
  img?: object;
  isCompleted?: boolean;
  isLocked?: boolean;
  isPlayable?: boolean;
  onPress?: () => void;
  subTitle?: string | null;
  title?: string;
};

const BoxMedia: React.FC<ContainerProps> = ({
  title,
  subTitle = null,
  isLocked = false,
  isPlayable = false,
  isCompleted = false,
  img = null,
  onPress = () => {},
}) => {
  const handlePress = () => {
    if (!isLocked) {
      onPress();
    }
  };
  return (
    <S.Container disabled={isLocked} onPress={handlePress}>
      <S.Wrapper>
        <S.Box img={!!img} isCompleted={isCompleted} isLocked={isLocked}>
          {img && <S.Image source={img} />}
          <S.Headline>
            <S.Title>{title}</S.Title>
            {subTitle !== null && <S.SubTitle>{subTitle}</S.SubTitle>}
          </S.Headline>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.16,
              shadowRadius: 2,
            }}>
            {!isLocked && isPlayable && <IconPlay />}
            {isLocked && <IconLocked />}
          </DropShadow>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoxMedia;
