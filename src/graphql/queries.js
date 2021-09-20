import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query Repositories ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryParts
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn ($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser ($user: CreateUserInput!) {
    createUser(user: $user) {
      username
    }
  }
`;

export const GET_USER = gql`
  query AuthorizedUser ($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node{
            id
            repositoryId
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query RepositoryById ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryParts
      url
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      userId
      repositoryId
      rating
      text
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview ($id: ID!) {
    deleteReview(id: $id)
  }
`;
