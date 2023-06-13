import type {ReactNode} from 'react';
import React, {useEffect, useState} from 'react';

import S from './styles';

type HeaderVariant = 'boxed' | 'headers';

type Item = {
  id: string;
  label: string;
  render: () => ReactNode;
};

type TabbedBox = {
  items: Item[];
  headerVariant?: HeaderVariant;
};

type NavigationItem = {
  active: boolean;
  onPress: () => void;
  title: string;
};

const NavigationItem: React.FC<NavigationItem> = ({title, active, onPress}) => {
  return (
    <S.Navigation.Button active={active} onPress={onPress}>
      <S.Navigation.Text active={active}>{title}</S.Navigation.Text>
    </S.Navigation.Button>
  );
};

const LinkItem: React.FC<NavigationItem> = ({title, active, onPress}) => {
  return (
    <S.LinkItem.Link active={active} onPress={onPress}>
      <S.LinkItem.Text active={active}>{title}</S.LinkItem.Text>
      <S.LinkItem.Border active={active} />
    </S.LinkItem.Link>
  );
};

const TabbedBox: React.FC<TabbedBox> = ({items, headerVariant = 'boxed'}) => {
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    if (selected) {
      const sameItem = items.find(item => item.id === selected.id);

      if (sameItem) {
        setSelected(sameItem);
        return;
      }
    }

    if (items.length) {
      setSelected(items[0]);
    } else {
      setSelected(null);
    }
  }, [items]);

  return (
    <S.WrapperContainer>
      <S.Wrapper>
        <S.Navigation.Container>
          <S.Navigation.Wrapper>
            {headerVariant === 'boxed' &&
              items.map(item => (
                <NavigationItem
                  key={item.id}
                  active={item === selected}
                  title={item.label}
                  onPress={() => setSelected(item)}
                />
              ))}
            {headerVariant === 'headers' &&
              items.map(item => (
                <LinkItem
                  key={item.id}
                  active={item === selected}
                  title={item.label}
                  onPress={() => setSelected(item)}
                />
              ))}
          </S.Navigation.Wrapper>
        </S.Navigation.Container>
        {selected && selected.render()}
      </S.Wrapper>
    </S.WrapperContainer>
  );
};

export default TabbedBox;
