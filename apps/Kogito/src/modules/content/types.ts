import type {
  ArticleItem,
  AudioItem,
  VideoItem,
} from '../../../gql/__generated__/graphql';

export type ContentItem = AudioItem | ArticleItem | VideoItem;
