import type {ReactElement} from 'react';
import React from 'react';

import {Left, Line, PullRight, Spacer, Wrapper} from './styles';

type ChapterHeader = {
  left: ReactElement;
  right: ReactElement;
};

const ChapterHeader: React.FC<ChapterHeader> = ({left, right}) => {
  return (
    <Wrapper>
      <Line>
        <Left>{left}</Left>
        <PullRight>{right}</PullRight>
      </Line>
      <Spacer />
    </Wrapper>
  );
};

export default ChapterHeader;
