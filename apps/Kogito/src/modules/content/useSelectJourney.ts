import {gql, useMutation} from '@apollo/client';

import type {
  SelectJourneyMutation,
  SelectJourneyMutationVariables,
} from '../../../gql/__generated__/graphql';

const mutation = gql`
  mutation selectJourney($id: ID) {
    selectJourney(id: $id)
  }
`;

export const useSelectJourney = () => {
  const [selectJourneyMutation] = useMutation<
    SelectJourneyMutation,
    SelectJourneyMutationVariables
  >(mutation);

  return {
    selectJourneyMutation,
  };
};
