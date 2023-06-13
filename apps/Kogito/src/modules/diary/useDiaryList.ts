import {gql, useQuery} from '@apollo/client';

import type {
  DiaryListQuery,
  DiaryListQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query diaryList($afterId: ID) {
    diaryList(afterId: $afterId) {
      records {
        id
        date
        previewText
      }
      haveNext
    }
  }
`;

export const useDiaryList = () => {
  const {data, refetch} = useQuery<DiaryListQuery, DiaryListQueryVariables>(
    query,
  );

  if (data) {
    return {
      records: data.diaryList.records,
      haveNext: data.diaryList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    haveNext: false,
    refetch,
  };
};
