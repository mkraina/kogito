import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {Color} from './MainContainerWrapper';

export const Container = styled.View<{color: Color | null}>`
  height: 100%;
  ${variant({
    prop: 'color',
    variants: {
      white: {
        background: '#fff',
      },
    },
  })}
`;
