import React from 'react';
import type {ViewProps} from 'react-native';

import {Container} from './styles';

export type Align = 'center' | 'left' | 'right' | 'between';
export type AlignVertical = 'center' | 'bottom' | 'between';
export type Page = 'dashboard' | 'sub' | 'withoutFooter' | 'subWithoutFooter';
export type Color = 'white' | 'main';

type MainContainerProps = ViewProps & {
  align?: Align;
  alignVertical?: AlignVertical;
  color?: Color;
  page?: Page;
};

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  align = 'center',
  alignVertical,
  page,
  color,
  ...rest
}) => {
  return (
    <Container
      align={align}
      alignVertical={alignVertical}
      color={color}
      page={page}
      {...rest}>
      {children}
    </Container>
  );
};

export default MainContainer;
