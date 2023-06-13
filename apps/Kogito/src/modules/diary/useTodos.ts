import {gql, useMutation, useQuery} from '@apollo/client';

import type {
  EditTodoMutation,
  EditTodoMutationVariables,
  RemoveTodoMutation,
  RemoveTodoMutationVariables,
  TodosQuery,
  TodosQueryVariables,
  TrackTodoMutation,
  TrackTodoMutationVariables,
} from '../../../gql/__generated__/graphql';

const todosQuery = gql`
  query Todos {
    viewer {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

const editTodoMutation = gql`
  mutation editTodo($input: TodoInput!) {
    editTodo(input: $input) {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

const trackTodoMutation = gql`
  mutation trackTodo($input: TrackTodoInput!) {
    trackTodo(input: $input) {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

const removeTodoMutation = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id) {
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

export const useTodos = () => {
  const {data, refetch} = useQuery<TodosQuery, TodosQueryVariables>(todosQuery);

  const [editTodo] = useMutation<EditTodoMutation, EditTodoMutationVariables>(
    editTodoMutation,
  );
  const [trackTodo] = useMutation<
    TrackTodoMutation,
    TrackTodoMutationVariables
  >(trackTodoMutation);
  const [removeTodo] = useMutation<
    RemoveTodoMutation,
    RemoveTodoMutationVariables
  >(removeTodoMutation);

  const saveTodo = async (input: any) => {
    await editTodo({
      variables: {
        input,
      },
    });
  };

  if (data) {
    return {
      todos: data.viewer.todayTodos,
      refetch,

      editTodo,
      trackTodo,
      saveTodo,
      removeTodo,
    };
  }

  return {
    todos: [],
    refetch,

    editTodo,
    trackTodo,
    saveTodo,
    removeTodo,
  };
};
