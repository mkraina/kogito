import React from 'react';

import {Container} from './styles';

export type Color = 'white' | null;

type MainContainerProps = React.PropsWithChildren & {
  color?: Color;
};

const MainContainerWrapper: React.FC<MainContainerProps> = ({
  children,
  color = null,
  ...rest
}) => {
  return (
    <Container color={color} {...rest}>
      {children}
    </Container>
  );
};

export default MainContainerWrapper;
