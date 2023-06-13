import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';
import {variant} from 'styled-system';

import Check from '../../../assets/check.svg';

const StyledButton = styled.TouchableOpacity``;
const Wrapper = styled.View<{finished: boolean}>`
  width: 100%;
  border-radius: 15px;
  background: #fff;
  min-height: 80px;
  margin-bottom: 14px;
  padding: 25px;
  ${variant({
    prop: 'finished',
    variants: {
      false: {
        'background-color': 'rgba(0, 0, 0, 0.05)',
      },
      true: {
        'background-color': '#ffffff',
      },
    },
  })}
`;

const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PullRight = styled.View``;

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  min-width: 26px;
  text-align: center;
`;

type QuestionnaireWidget = {
  finished: boolean;
  name: string;
  press: () => void;
  count?: number;
};

const QuestionnaireWidget: React.FC<QuestionnaireWidget> = ({
  name,
  finished,
  count,
  press,
}) => {
  return (
    <StyledButton onPress={press}>
      {finished && (
        <DropShadow
          style={{
            shadowColor: '#666F8B',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
          <Wrapper finished={finished}>
            <Line>
              <Text>{name}</Text>
              <PullRight>
                <Check />
              </PullRight>
            </Line>
          </Wrapper>
        </DropShadow>
      )}
      {!finished && (
        <Wrapper finished={finished}>
          <Line>
            <Text>{name}</Text>
            <PullRight>
              <Text>{count}</Text>
            </PullRight>
          </Line>
        </Wrapper>
      )}
    </StyledButton>
  );
};

export default QuestionnaireWidget;
