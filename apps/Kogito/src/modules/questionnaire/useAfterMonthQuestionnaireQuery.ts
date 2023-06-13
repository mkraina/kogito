import {gql, useQuery} from '@apollo/client';

import type {
  CurrentUserQuestionnairesQuery,
  CurrentUserQuestionnairesQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query CurrentUserQuestionnaires {
    currentUserQuestionnaires {
      occasion
      questionnaires {
        id
        finished
        questionnaire {
          id
          name
          questionCount
        }
      }
    }
    viewer {
      haveActiveQuestionnaire
    }
    registrationStatus {
      journeysToChoose
    }
  }
`;

export const useAfterMonthQuestionnaireQuery = () => {
  const {loading, error, data, refetch} = useQuery<
    CurrentUserQuestionnairesQuery,
    CurrentUserQuestionnairesQueryVariables
  >(query);

  console.log({data});

  return {
    haveActiveQuestionnaire: data?.viewer.haveActiveQuestionnaire || false,
    haveToChooseJourney:
      (data?.registrationStatus.journeysToChoose.length || 0) > 0 || false,
    questionnaire: data?.currentUserQuestionnaires || null,

    refetch,
    loading,
    error,
  };
};
