import React from 'react';

import S from './styles';

type ContainerProps = React.PropsWithChildren;

const BoxMediaWrapper: React.FC<ContainerProps> = ({children, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  );
};

export default BoxMediaWrapper;
