import {gql, useMutation} from '@apollo/client';

import type {
  EditProfileMutation,
  EditProfileMutationVariables,
} from '../../../gql/__generated__/graphql';

const mutation = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      viewer {
        me {
          firstName
          lastName
        }
      }
    }
  }
`;

export const useEditProfile = () => {
  const [editProfileMutation] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(mutation);

  return {
    editProfileMutation,
  };
};
