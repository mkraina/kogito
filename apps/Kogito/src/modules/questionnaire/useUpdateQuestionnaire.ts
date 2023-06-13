import {useCallback} from 'react';
import {gql, useMutation} from '@apollo/client';

import type {
  UpdateQuestionnaireMutation,
  UpdateQuestionnaireMutationVariables,
  UserAnswer,
} from '../../../gql/__generated__/graphql';

const mutation = gql`
  mutation updateQuestionnaire($input: UserQuestionnaireInput!) {
    updateQuestionnaire(input: $input) {
      id
      finished
    }
  }
`;

export const useUpdateQuestionnaire = () => {
  const [save] = useMutation<
    UpdateQuestionnaireMutation,
    UpdateQuestionnaireMutationVariables
  >(mutation);

  const saveUserQuestionnaire = useCallback(
    async (id: string, answers: UserAnswer[]) => {
      await save({
        variables: {
          input: {
            id,
            answers,
          },
        },
      });
    },
    [save],
  );

  return {
    saveUserQuestionnaire,
  };
};
