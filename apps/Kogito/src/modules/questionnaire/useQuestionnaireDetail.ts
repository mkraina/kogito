import {gql, useQuery} from '@apollo/client';

import type {
  QuestionnaireDetailQuery,
  QuestionnaireDetailQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query questionnaireDetail($id: ID!) {
    questionnaireDetail(id: $id) {
      id
      answers {
        questionId
        answerIndex
      }
      questionnaire {
        name
        questionCount
        questions {
          id
          question
          answers {
            answer
          }
        }
      }
    }
  }
`;

export const useQuestionnaireDetail = (id: string) => {
  const {loading, error, data} = useQuery<
    QuestionnaireDetailQuery,
    QuestionnaireDetailQueryVariables
  >(query, {
    variables: {
      id,
    },
  });

  return {
    questionnaire: data?.questionnaireDetail,
    loading,
    error,
  };
};
