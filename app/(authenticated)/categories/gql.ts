import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories($page: Int, $limit: Int, $search: String, $sortBy: String, $sortOrder: String, $type: CategoryType) {
  getAllCategories(page: $page, limit: $limit, search: $search, sortBy: $sortBy, sortOrder: $sortOrder, type: $type) {
    status
    message
    data {
      id
      name
      type
      description
      color
      icon
      expenseLimit
    }
    pagination {
      page
      limit
      total
      totalPages
    }
    
  }
}
`;

export const GET_CATEGORY = gql`
query GetCategory($getCategoryId: String!) {
  getCategory(id: $getCategoryId) {
    status
    message
    data {
      id
      name
      type
      description
      color
      icon
      expenseLimit
    }
  }
}
`;

export const CREATE_CATEGORY = gql`
mutation CreateCategory($input: CategoryInput) {
  createCategory(input: $input) {
    status
    message
    data {
      id
      name
      type
      description
      color
      icon
      expenseLimit
    }
  }
}
`;

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($updateCategoryId: String!, $input: CategoryInput!) {
  updateCategory(id: $updateCategoryId, input: $input) {
    status
    message
  }
}
`;

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId) {
    message
    status
  }
}
`;