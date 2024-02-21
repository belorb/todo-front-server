import { gql } from '@apollo/client';

export const UPDATE_TODO_STATUS = gql`
 mutation UpdateTodoStatus($TodoId: ID!, $NewStatus: Boolean!) {
    updateTodoStatusById(id: $TodoId, isDone: $NewStatus) {
      id
      isDone
    }
  }
`;