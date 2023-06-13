import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {ColorVariants} from './ButtonBack';

type Button = {
  colorVariant: ColorVariants;
};

export const StyledButton = styled.TouchableOpacity<Button>`
  justify-content: center;
  align-items: center;
  border-radius: 64px;
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  ${variant({
    prop: 'colorVariant',
    variants: {
      red: {
        backgroundColor: 'rgba(202,66,51,0.2)',
      },
      white: {
        backgroundColor: '#ffffff',
      },
      transparent: {},
    },
  })}
`;
