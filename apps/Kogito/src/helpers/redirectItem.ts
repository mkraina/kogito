import type {StackNavigationProp} from '@react-navigation/stack/src/types';

import type {ContentItem} from '../modules/content/types';

export const redirectItem = (
  navigation: StackNavigationProp<any>,
  item: Pick<ContentItem, 'options' | '__typename' | 'progress' | 'id'>,
): void => {
  if (item.options && item.progress === 100) {
    const options = JSON.parse(item.options);
    if (options.navigate) {
      navigation.navigate(options.navigate.name);
      return;
    }
  }

  switch (item.__typename) {
    case 'AudioItem':
      return navigation.navigate('Audio', {id: item.id});
    case 'VideoItem':
      return navigation.navigate('Video', {id: item.id});
    case 'ArticleItem':
      return navigation.navigate('Article', {id: item.id});
  }
};
