import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {StateVariants} from './Hero';

export const Link = styled.TouchableOpacity``;

export const TextSmall = styled.Text`
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.32);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;
export const TextMain = styled.Text<{state: StateVariants}>`
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.65);
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  ${variant({
    prop: 'state',
    variants: {
      onlyHeadline: {
        marginTop: 32,
        marginBottom: 0,
      },
      mainInfo: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  })}
`;

export const Center = styled.View<{state: StateVariants}>`
  ${variant({
    prop: 'state',
    variants: {
      mainInfo: {
        marginY: 'auto',
      },
    },
  })}
`;

export const Container = styled.View`
  overflow: hidden;
`;

export const ContainerInner = styled.View<{state: StateVariants}>`
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  aspect-ratio: 1;
  padding: 22px;
  margin: auto;
  background-color: rgba(117, 74, 0, 0.2);
  ${variant({
    prop: 'state',
    variants: {
      onlyHeadline: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        maxHeight: '325px',
      },
      mainInfo: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        maxHeight: '325px',
      },
    },
  })}
`;
