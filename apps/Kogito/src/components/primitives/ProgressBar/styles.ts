import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {ProgressBarVariants} from './ProgressBar';

type ProgressLine = {
  progressBarVariants: ProgressBarVariants;
  value: number;
};

export const Wrapper = styled.View`
  padding: 10px;
  margin-bottom: 0;
`;

type Barrier = {
  progressBarVariants: ProgressBarVariants;
};

export const Barrier = styled.View<Barrier>`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #e4e4e4;
  ${variant({
    prop: 'progressBarVariants',
    variants: {
      small: {
        height: '12px',
        borderRadius: '30px',
        background: 'rgba(255, 255, 255, 0.33)',
        width: '80px',
        margin: 'auto',
      },
      level: {
        height: '12px',
        borderRadius: '30px',
        background: '#f5f4fa',
        width: '80px',
        margin: 'auto',
      },
    },
  })}
`;

export const ProgressLine = styled.View<ProgressLine>`
  width: ${props => `${props.value}%`};
  height: 4px;
  border-radius: 2px;
  background-color: #f2ac33;
  ${variant({
    prop: 'progressBarVariants',
    variants: {
      small: {
        height: '12px',
        borderRadius: '30px',
      },
      level: {
        height: '12px',
        borderRadius: '30px',
      },
    },
  })}
`;
