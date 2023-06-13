import {gql, useMutation} from '@apollo/client';

import type {
  TrackScheduleMutation,
  TrackTodoMutationVariables,
} from '../../../gql/__generated__/graphql';

const mutation = gql`
  mutation trackSchedule($input: TrackScheduleInput!) {
    trackSchedule(input: $input) {
      success
    }
  }
`;

export const useTrackSchedule = () => {
  const [trackScheduleMutation] = useMutation<
    TrackScheduleMutation,
    TrackTodoMutationVariables
  >(mutation);

  return {
    trackScheduleMutation,
  };
};
