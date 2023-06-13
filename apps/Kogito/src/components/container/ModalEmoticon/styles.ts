import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {Mood} from '../../../../gql/__generated__/graphql';

const S = {
  Modal: styled.Modal`
    margin: 0;
  `,
  ContainerWrap: styled.View<{type: Mood}>`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: grey;
    ${variant({
      prop: 'type',
      variants: {
        HAPPY: {
          background: '#ffe382',
        },
        SAD: {
          background: '#68e0fb',
        },
        ANGRY: {
          background: '#ff8291',
        },
        OKAY: {
          background: '#e4e4e4',
        },
      },
    })};
  `,

  Close: styled.TouchableOpacity`
    position: absolute;
    top: 0;
    right: 0;
    padding: 32px;
    z-index: 1;
  `,

  ContainerInner: styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
  EmoticonBg: styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    resize-mode: cover;
  `,
  EmoticonImage: styled.Image`
    margin-bottom: -70px;
  `,
  EmoticonContent: styled.View`
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: auto;
  `,
  EmoticonButton: styled.View`
    height: 95px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border: solid 1px transparent;
    border-top-color: rgba(0, 0, 0, 0.11);
  `,
};

export default S;
