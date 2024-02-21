import { gql } from "@apollo/client";

export const GET_TODO_DETAIL = gql`
  query TodoDetail($TodoId: ID!) {
    getTodoById(id: $TodoId) {
      id
      createdAt
      type
      isDone
      text
      title
    }
  }
`;