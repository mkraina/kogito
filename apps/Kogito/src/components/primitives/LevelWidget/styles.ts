import styled from 'styled-components/native';
import {variant} from 'styled-system';

import type {LevelWidgetVariant} from './LevelWidget';

const S = {
  Container: styled.TouchableOpacity``,
  Wrapper: styled.View<{state: LevelWidgetVariant}>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.05);
    min-height: 80px;
    margin-bottom: 14px;
    padding: 12px 26px 12px 32px;
    ${variant({
      prop: 'state',
      variants: {
        done: {
          background: '#fff',
          shadowColor: '#666F8B',
          shadowOffset: {width: 12, height: 0},
          shadowRadius: 20,
          shadowOpacity: 0.15,
          elevation: '3px',
        },
        inProgress: {
          background: '#fff',
          shadowColor: '#666F8B',
          shadowOffset: {width: 12, height: 0},
          shadowRadius: 20,
          shadowOpacity: 0.15,
          elevation: '3px',
        },
      },
    })}
  `,
  Text: styled.Text`
    color: #243936;
    font-size: 20px;
    font-weight: 700;
  `,
};

export default S;
