import {gql, useQuery} from '@apollo/client';

import type {
  MoodsListQuery,
  MoodsListQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query moodsList($afterId: ID) {
    moodsList(afterId: $afterId) {
      records {
        id
        date
        mood
      }
      moodsCount {
        mood
        count
      }
      haveNext
    }
  }
`;

export const useMoodsList = () => {
  const {data, error, refetch} = useQuery<
    MoodsListQuery,
    MoodsListQueryVariables
  >(query, {
    variables: {
      afterId: null,
    },
  });

  console.log({data, error});

  if (data) {
    return {
      records: data.moodsList.records,
      moodsCount: data.moodsList.moodsCount,
      haveNext: data.moodsList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    moodsCount: [],
    haveNext: false,
    refetch,
  };
};
