import {gql, useQuery} from '@apollo/client';

import type {
  ViciousCircleListQuery,
  ViciousCircleListQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query viciousCircleList($afterId: ID) {
    viciousCircleList(afterId: $afterId) {
      records {
        id
        name
        date
      }
      haveNext
    }
  }
`;

export const useViciousCircleList = () => {
  const {data, refetch} = useQuery<
    ViciousCircleListQuery,
    ViciousCircleListQueryVariables
  >(query);

  if (data) {
    return {
      records: data.viciousCircleList.records,
      haveNext: data.viciousCircleList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    haveNext: false,
    refetch,
  };
};
