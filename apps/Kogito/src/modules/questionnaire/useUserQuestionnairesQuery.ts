import {gql, useQuery} from '@apollo/client';

import type {UserQuestionnairesQuery} from '../../../gql/__generated__/graphql';

const query = gql`
  query UserQuestionnaires {
    userQuestionnaires {
      id
      finished
      questionnaire {
        id
        name
        questionCount
      }
    }
    viewer {
      me {
        userInfoCompleted
      }
    }
  }
`;

export const useUserQuestionnairesQuery = () => {
  const {loading, error, data, refetch} = useQuery<UserQuestionnairesQuery>(
    query,
    {},
  );

  return {
    userQuestionnaires: data?.userQuestionnaires,
    userState: data?.viewer.me,
    refetch,
    loading,
    error,
  };
};
