import React from 'react';

import IconSearch from '../../../assets/icon-search.svg';

import S from './styles';

const InputSearch: React.FC = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <IconSearch />
        <S.TextInput
          placeholder="Vyhledávej"
          placeholderTextColor="rgba(28,28,28,0.3)"
          returnKeyType="search"
        />
      </S.Wrapper>
    </S.Container>
  );
};

export default InputSearch;
