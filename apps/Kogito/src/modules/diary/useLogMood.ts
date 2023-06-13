import {gql, useMutation} from '@apollo/client';

import type {
  LogMoodMutation,
  LogMoodMutationVariables,
} from '../../../gql/__generated__/graphql';

const mutation = gql`
  mutation logMood($input: LogMoodInput!) {
    logMood(input: $input) {
      last
    }
  }
`;

export const useLogMood = () => {
  const [logMoodMutation] = useMutation<
    LogMoodMutation,
    LogMoodMutationVariables
  >(mutation);

  return logMoodMutation;
};
