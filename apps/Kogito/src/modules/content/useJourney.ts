import {gql, useQuery} from '@apollo/client';

import type {
  JourneyQuery,
  JourneyQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query journey($id: ID!) {
    journey(id: $id) {
      id
      name
      levels {
        id
        level
        progress
        phase {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        relaxation {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        tools {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        tasks {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
      }
    }
  }
`;

export const useJourney = (journeyId: string) => {
  const {data, loading, error, refetch} = useQuery<
    JourneyQuery,
    JourneyQueryVariables
  >(query, {
    variables: {
      id: journeyId,
    },
  });

  console.log({data, loading, error});

  if (data) {
    return {
      journey: data.journey,
      refetch,
    };
  }

  return {
    journey: null,
    refetch,
  };
};
