import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {Mood} from '../../../../gql/__generated__/graphql';

const S = {
  Container: styled.TouchableOpacity<{type: Mood}>`
    border-radius: 6px;
    margin-bottom: 4px;
    padding: 4px 12px;
    height: 40px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${variant({
      prop: 'type',
      variants: {
        SATISFIED: {
          background: 'rgba(255,227,130,0.24)',
        },
        HAPPY: {
          background: 'rgba(255,130,145,0.24)',
        },
        OKAY: {
          background: 'rgba(228,228,228,0.24)',
        },
        SAD: {
          background: 'rgba(72,213,245,0.24)',
        },
        VERYSAD: {
          background: 'rgba(128,168,217,0.24)',
        },
      },
    })};
  `,
  Image: styled.Image`
    width: 36px;
    height: 36px;
  `,
  Text: styled.Text`
    font-size: 13px;
    color: #3c3f64;
  `,
};

export default S;
