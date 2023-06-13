import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {Align} from './MainFooter';

type View = {
  align: Align;
};

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: -0.24px;
  font-weight: 400;
  height: 42px;
`;

export const Text = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  letter-spacing: -0.24px;
  font-weight: 400;
  margin-top: auto;
`;

export const BorderTop = styled.View`
  background: rgba(0, 0, 0, 0.3);
  height: 0.5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
export const Container = styled.View<View>`
  height: 84px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 24px;
  position: relative;
  ${variant({
    prop: 'align',
    variants: {
      center: {
        alignItems: 'center',
      },
      between: {
        justifyContent: 'space-between',
      },
      left: {
        alignItems: 'flex-start',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
  })}
`;
