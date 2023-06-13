import React from 'react';
import {TouchableOpacity} from 'react-native';

import HeroAnxiety from '../../../assets/anxiety/hero.svg';
import HeroDepression from '../../../assets/depression/hero.svg';
import Button from '../Button';
import GradientBackground from '../GradientBackground';
import ProgressBar from '../ProgressBar';

import {Center, Container, ContainerInner, TextMain, TextSmall} from './styles';

export type ImageVariant = 'depression' | 'anxiety';
export type StateVariants = 'onlyHeadline' | 'mainInfo' | 'normal';

const decideColors = (
  variant: ImageVariant | undefined,
  state: StateVariants,
) => {
  if (variant === 'depression') {
    return ['normal'].includes(state)
      ? {color1: '#FFCE8F', color2: '#FFA38F'}
      : {color1: 'transparent', color2: 'transparent'};
  }

  return ['normal'].includes(state)
    ? {color1: '#BF9BE8', color2: '#80A8D9'}
    : {color1: 'transparent', color2: 'transparent'};
};

type MainContainerProps = React.PropsWithChildren & {
  onPress?: () => void;

  onPressContinue?: () => void;
  progress?: number;
  state?: StateVariants;

  subTitle?: string;
  title?: string;

  variant?: ImageVariant;
};

const Hero: React.FC<MainContainerProps> = ({
  state = 'normal',
  subTitle,
  title,
  progress = 0,
  onPressContinue = () => {},
  onPress = () => {},
  variant,
}) => {
  return (
    <Container>
      <GradientBackground {...decideColors(variant, state)} angle={138}>
        <ContainerInner state={state}>
          {variant === 'depression' && (
            <HeroDepression
              style={{
                position: 'absolute',
                top: 100,
                left: '50%',
                transform: [{translateX: -118}],
              }}
            />
          )}
          {variant === 'anxiety' && (
            <HeroAnxiety
              style={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: [{translateX: -118}],
              }}
            />
          )}
          {subTitle && <TextSmall>{subTitle}</TextSmall>}
          <Center state={state}>
            {state !== 'onlyHeadline' && (
              <ProgressBar
                max={100}
                progressBarVariants="small"
                value={progress}
              />
            )}

            <TextMain state={state}>{title}</TextMain>

            {state === 'normal' && (
              <Button
                colorVariant="orange"
                style={{
                  alignSelf: 'center',
                }}
                title="Pokračovat"
                type="medium"
                onPress={onPressContinue}
              />
            )}
          </Center>
          {state === 'normal' && (
            <TouchableOpacity onPress={onPress}>
              <TextSmall>Zobrazit všechny úrovně</TextSmall>
            </TouchableOpacity>
          )}
        </ContainerInner>
      </GradientBackground>
    </Container>
  );
};

export default Hero;
