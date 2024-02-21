import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query TodoList($orderBy: Ordering, $filters: TodoFiltersInput) {
    getTodoList(orderBy: $orderBy, filters: $filters) {
      id
      type
      title
      createdAt
      isDone
    }
  }
`;