import {gql, useQuery} from '@apollo/client';

import type {
  ItemDetailQuery,
  ItemDetailQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query itemDetail($id: ID!) {
    itemDetail(id: $id) {
      id
      name
      subTitle
      image
      options
      ... on AudioItem {
        duration
        transcript
        link
        next
        previous
      }
      ... on ArticleItem {
        content {
          content
          continue
        }
      }
      ... on VideoItem {
        link
      }
    }
  }
`;

export const useItemContent = (id: string) => {
  const {data, loading} = useQuery<ItemDetailQuery, ItemDetailQueryVariables>(
    query,
    {
      variables: {
        id,
      },
    },
  );

  if (data) {
    return {
      audioFile:
        data.itemDetail.__typename === 'AudioItem' ? data.itemDetail : null,
      articleItem:
        data.itemDetail.__typename === 'ArticleItem' ? data.itemDetail : null,
      videoItem:
        data.itemDetail.__typename === 'VideoItem' ? data.itemDetail : null,
      loading: false,
    };
  }

  return {
    audioFile: null,
    articleItem: null,
    videoItem: null,
    loading,
  };
};
