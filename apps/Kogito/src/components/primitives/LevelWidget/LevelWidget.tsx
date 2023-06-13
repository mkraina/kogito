import React from 'react';

import Check from '../../../assets/check.svg';
import ProgressBar from '../ProgressBar';

import S from './styles';

export type LevelWidgetVariant = 'done' | 'inProgress' | 'locked';

type ContainerProps = {
  name: string;
  progress: number;
  maxProgress?: number;
  onPress?: () => void;
  state?: LevelWidgetVariant;
};

const LevelWidget: React.FC<ContainerProps> = ({
  name,
  state = 'locked',
  onPress = () => {},
  progress,
  maxProgress = 100,
}) => {
  console.log({progress});

  return (
    <S.Container disabled={state === 'locked'} onPress={onPress}>
      <S.Wrapper state={state}>
        <S.Text>{name}</S.Text>
        {state === 'done' && <Check />}
        {state === 'inProgress' && (
          <ProgressBar
            max={maxProgress}
            progressBarVariants="level"
            value={progress}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default LevelWidget;
