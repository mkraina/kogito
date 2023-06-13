import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {Align, ColorVariant, Space, TextVariant} from './Text';

type Container = {
  align: Align;
  space: Space;
};
type Text = {
  add: boolean | null;
  colorVariant: ColorVariant;
  textVariant: TextVariant;
};

const S = {
  Container: styled.View<Container>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    ${variant({
      prop: 'align',
      variants: {
        center: {
          justifyContent: 'center',
        },
        right: {
          justifyContent: 'flex-end',
        },
        left: {
          justifyContent: 'flex-start',
        },
      },
    })};
    ${variant({
      prop: 'space',
      variants: {
        main: {
          paddingX: '24px',
        },
        mainY: {
          paddingY: '24px',
        },
      },
    })};
  `,
  StyledText: styled.Text<Text>`
    color: #1c1c1c;
    ${variant({
      prop: 'textVariant',
      variants: {
        bigHeader: {
          fontSize: '28px',
          fontWeight: 'bold',
        },
        leftBigHeader: {
          fontSize: '28px',
          fontWeight: 'bold',
        },
        questionNumber: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
        header: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
        headerSub: {
          fontSize: '18px',
          fontWeight: 'bold',
          marginTop: '40px',
          marginBottom: '24px',
        },
        headerSub2: {
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '28px',
          marginBottom: '14px',
        },
        text: {
          fontSize: '16px',
        },
        text600: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
        textSmall: {
          fontSize: '14px',
        },
        textMini: {
          opacity: 0.5,
          color: '#3c3f64',
          fontSize: 13,
          fontWeight: '400',
        },
        textCopy: {
          fontSize: '5px',
          color: '#ca4233',
        },
      },
    })};
    ${variant({
      prop: 'colorVariant',
      variants: {
        gray: {
          color: '#3c3f64',
        },
        main: {
          color: '#ca4233',
        },
      },
    })};
  `,
};

export default S;
