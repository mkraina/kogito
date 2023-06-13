import {gql, useQuery} from '@apollo/client';

const query = gql`
  query RegistrationStatus {
    registrationStatus {
      isCompleted
      userLabel
      journeysToChoose
      group
    }
  }
`;

type RegisterStatus = {
  group: 'normal' | 'control';
  isCompleted: boolean;
  journeysToChoose: string[];
  userLabel: `V${'a' | 'b' | 'c' | 'd' | 'e' | 'f'}`;
};

export const useRegistrationStatus = () => {
  const {loading, refetch, data} = useQuery<{
    registrationStatus: RegisterStatus;
  }>(query);

  return {
    status: data?.registrationStatus,
    refetch,
    loading,
  };
};
