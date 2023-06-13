import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../Button';

import {Container, ContainerInner, Title} from './styles';

type BoxBigProps = {
  buttonText: string;
  title: string;
  onPress?: () => void;
};

const ArticleListBox: React.FC<BoxBigProps> = ({
  title,
  buttonText,
  onPress = () => {},
}) => {
  return (
    <Container>
      <LinearGradient
        angle={138}
        colors={['#FFCE8F', '#FFA38F']}
        useAngle={true}>
        <ContainerInner
          style={
            {
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // flexWrap: 'wrap',
            }
          }>
          {/*<View>*/}
          <Title>{title}</Title>
          {/*<Moment element={Text}>{date}</Moment>*/}
          {/*</View>*/}
          <Button
            colorVariant="red"
            title={buttonText}
            type="small"
            onPress={onPress}
          />
        </ContainerInner>
      </LinearGradient>
    </Container>
  );
};

export default ArticleListBox;
