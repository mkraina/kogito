import {gql, useQuery} from '@apollo/client';

import type {
  StoryDetailQuery,
  StoryDetailQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query storyDetail($id: ID!) {
    storyDetail(id: $id) {
      id
      title
      published
      content
      videoLink
    }
  }
`;

export const useStoryContent = (id: string) => {
  const {data, loading} = useQuery<StoryDetailQuery, StoryDetailQueryVariables>(
    query,
    {
      variables: {
        id,
      },
    },
  );

  return {
    story: (data && data.storyDetail) || null,
    loading,
  };
};
