import styled from 'styled-components/native';
import {variant} from 'styled-system';

type Props = {img: boolean; isCompleted: boolean; isLocked: boolean};
const boxBackgroundColor = (props: Props) => {
  if (props.isLocked) {
    return '#fff';
  }

  if (props.isCompleted) {
    return '#fafafa';
  }

  return '#f5f4fa';
};

const S = {
  Container: styled.TouchableOpacity`
    margin-bottom: 5px;
  `,
  Wrapper: styled.View``,
  Box: styled.View<Props>`
    flex-direction: row;
    align-items: center;
    min-height: 90px;
    border-radius: 10px;
    overflow: hidden;
    padding: 8px 28px 8px 8px;
    ${variant({
      prop: 'img',
      variants: {
        false: {
          paddingLeft: 24,
        },
      },
    })};
    background-color: ${props => boxBackgroundColor(props)};
  `,
  Image: styled.Image`
    flex: 0 0 72px;
    width: 72px;
    height: 72px;
    resize-mode: cover;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 26px;
  `,
  Headline: styled.View`
    flex: 1 1 auto;
  `,
  Title: styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: #3c3f64;
  `,
  SubTitle: styled.Text`
    font-size: 13px;
    font-weight: 400;
    color: #3c3f64;
  `,
};

export default S;
