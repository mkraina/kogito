import {gql, useMutation, useQuery} from '@apollo/client';

import type {
  CurrentUserQuestionnairesQueryVariables,
  CurrentViciousCircleQuery,
  EditViciousCircleMutation,
  EditViciousCircleMutationVariables,
} from '../../../gql/__generated__/graphql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ViciousCircle = gql`
  query viciousCircle($id: ID!) {
    viciousCircle(id: $id) {
      id
      date
      name
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

const CurrentViciousCircle = gql`
  query currentViciousCircle {
    currentViciousCircle {
      id
      date
      name
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

const ViciousCircleMutation = gql`
  mutation editViciousCircle($input: EditViciousCircleInput!) {
    editViciousCircle(input: $input) {
      id
      name
      date
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

export const useViciousCircle = () => {
  // const {data, error, refetch} = useQuery(ViciousCircle, {
  //   authorizedOnly: true,
  //   variables: {
  //     id,
  //   },
  //   skip: id === null,
  // });

  const {data, refetch} = useQuery<
    CurrentViciousCircleQuery,
    CurrentUserQuestionnairesQueryVariables
  >(CurrentViciousCircle);

  const [save] = useMutation<
    EditViciousCircleMutation,
    EditViciousCircleMutationVariables
  >(ViciousCircleMutation);

  if (data) {
    return {
      viciousCircle: data.currentViciousCircle,
      refetch,
      save,
    };
  }

  return {
    viciousCircle: null,
    refetch,
    save,
  };
};
