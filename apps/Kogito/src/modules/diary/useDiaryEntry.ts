import {gql, useMutation, useQuery} from '@apollo/client';

import type {
  DiaryEntryQuery,
  DiaryEntryQueryVariables,
  EditDiaryEntryMutation,
  EditDiaryEntryMutationVariables,
  RemoveDiaryEntryMutation,
  RemoveDiaryEntryMutationVariables,
} from '../../../gql/__generated__/graphql';

const diaryEntryQuery = gql`
  query diaryEntry($id: ID!) {
    diaryEntry(id: $id) {
      id
      date
      content
    }
  }
`;

const diaryEditAction = gql`
  mutation editDiaryEntry($input: EditDiaryEntryInput!) {
    editDiaryEntry(input: $input) {
      id
      date
      previewText
      content
    }
  }
`;

const diaryRemoveAction = gql`
  mutation removeDiaryEntry($id: ID!) {
    removeDiaryEntry(id: $id)
  }
`;

export const useDiaryEntry = (id: string | null) => {
  const {data} = useQuery<DiaryEntryQuery, DiaryEntryQueryVariables>(
    diaryEntryQuery,
    {
      variables: {
        id: id!,
      },
      skip: !id,
    },
  );

  const [saveDiaryEntry] = useMutation<
    EditDiaryEntryMutation,
    EditDiaryEntryMutationVariables
  >(diaryEditAction);
  const [removeDiaryEntry] = useMutation<
    RemoveDiaryEntryMutation,
    RemoveDiaryEntryMutationVariables
  >(diaryRemoveAction);

  if (data) {
    return {
      diaryEntry: data.diaryEntry,
      saveDiaryEntry,
      removeDiaryEntry,
    };
  }

  return {
    diaryEntry: null,
    saveDiaryEntry,
    removeDiaryEntry,
  };
};
