import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {ColorVariants, Type} from './Button';

type Button = {
  colorVariant: ColorVariants;
  type: Type;
};

export const StyledButton = styled.TouchableOpacity<Button>`
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  flex: 0 1 auto;
  flex-direction: row;
  ${variant({
    prop: 'colorVariant',
    variants: {
      red: {
        backgroundColor: '#ca4233',
      },
      white: {
        backgroundColor: '#ffffff',
      },
      orange: {
        boxShadow: '0 1px 2px rgba(84, 54, 3, 0.47)',
        backgroundColor: '#f2ac33',
      },
      transparent: {},
    },
  })}
  ${variant({
    prop: 'type',
    variants: {
      small: {
        padding: '8px 26px',
        minHeight: '36px',
      },
      medium: {
        padding: '12px 26px',
        minHeight: '48px',
      },
      large: {
        padding: '18px',
        minHeight: '64px',
        width: '100%',
      },
    },
  })}
`;

type Text = {
  colorVariant: ColorVariants;
  type: Type;
};

export const ButtonInnerText = styled.Text<Text>`
  color: #ffffff;
  font-weight: 700;
  ${variant({
    prop: 'colorVariant',
    variants: {
      red: {},
      white: {
        color: '#000000',
      },
      orange: {},
      transparent: {
        color: '#ca4233',
      },
      transparentBlack: {
        color: '#000000',
      },
    },
  })}
  ${variant({
    prop: 'type',
    variants: {
      small: {
        fontSize: '16px',
      },
      medium: {
        fontSize: '18px',
      },
      large: {
        fontSize: '20px',
      },
    },
  })}
`;
