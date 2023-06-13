import React from 'react';
import styled from 'styled-components/native';
import {variant} from 'styled-system';

type ActiveProps = {
  active: boolean;
};

const S = {
  Box: styled.View<ActiveProps>`
    flex-direction: row;
    border-radius: 20px;
    padding: 32px;
    padding-left: 24px;
    background-color: ${props => (props.active ? '#FFFFFF' : 'transparent')};
  `,
  Number: styled.View`
    width: 43px;
    height: 43px;
    border-color: rgba(0, 0, 0, 0.1);
    border-width: 1px;
    align-items: center;
    justify-content: center;
    border-radius: 43px;
    margin-right: 18px;
  `,
  NumberText: styled.Text`
    font-size: 22px;
    line-height: 25px;
    color: #000000;
  `,
  Content: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  BoxHeadline: styled.Text`
    font-weight: 600;
    font-size: 18px;
    line-height: 21;
    color: #000000;
    margin-bottom: 15px;
  `,
  BoxTextWrapper: styled.View`
    flex-direction: row;
  `,
  BoxText: styled.Text`
    font-size: 15px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 22px;
    flex: 1;
    flex-wrap: wrap;
  `,
  Button: styled.TouchableOpacity<ActiveProps>`
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 1px;
    border-radius: 4px;
    height: 38px;
    align-items: center;
    justify-content: center;
    padding-horizontal: 12px;
    padding-vertical: 8px;
    ${variant({
      prop: 'active',
      variants: {
        true: {
          backgroundColor: '#faebea',
          borderColor: '#faebea',
          color: '#CA4233',
        },
      },
    })}
  `,
  ButtonText: styled.Text<ActiveProps>`
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: ${props => (props.active ? '#CA4233' : '#000')};
  `,
};

type BoxJourneyProps = {
  description: string;
  highlighted: boolean;
  index: number;
  onClick: () => void;
  title: string;
};

const BoxJourney: React.FC<BoxJourneyProps> = ({
  highlighted,
  index,
  title,
  description,
  onClick,
}) => {
  return (
    <S.Box active={highlighted}>
      <S.Number>
        <S.NumberText>{index}</S.NumberText>
      </S.Number>
      <S.Content>
        <S.BoxHeadline>{title}</S.BoxHeadline>
        <S.BoxTextWrapper>
          <S.BoxText>{description}</S.BoxText>
        </S.BoxTextWrapper>
        <S.Button active={highlighted} onPress={() => onClick()}>
          <S.ButtonText active={highlighted}>Otevřít cestu</S.ButtonText>
        </S.Button>
      </S.Content>
    </S.Box>
  );
};

export default BoxJourney;
