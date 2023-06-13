import styled from 'styled-components/native';
import {variant} from 'styled-system';

export const Image = styled.Image`
  width: 100%;
  ${variant({
    prop: 'isBonus',
    variants: {
      true: {
        height: 215,
        resizeMode: 'cover',
      },
    },
  })};
`;
export const Text = styled.Text<{isBonus: boolean}>`
  color: #3c3f64;
  font-size: 18px;
  font-weight: 700;
  ${variant({
    prop: 'isBonus',
    variants: {
      true: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '18px',
        flex: '1 1 auto',
      },
    },
  })};
`;
export const TextWrapper = styled.View<{isBonus: boolean}>`
  min-height: 61px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: relative;
  ${variant({
    prop: 'isBonus',
    variants: {
      true: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 16px',
        justifyContent: 'space-between',
      },
    },
  })};
`;
export const Container = styled.TouchableOpacity``;
export const Wrapper = styled.View<{isBonus: boolean; isDisabled: boolean}>`
  border-radius: 15px;
  background: #ffffff;
  width: 180px;
  margin-right: 16px;
  position: relative;
  overflow: hidden;
  ${variant({
    prop: 'isDisabled',
    variants: {
      true: {
        opacity: '0.4',
      },
    },
  })};
  ${variant({
    prop: 'isBonus',
    variants: {
      true: {},
    },
  })};
`;
