import {gql} from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      id
      email
      username
      createdAt
      googleId
      token
      language
      name
      photo
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      id
      email
      username
      createdAt
      googleId
      token
      language
      name
      photo
    }
  }
`;

export const LOGIN_GOOGLE_USER = gql`
  mutation LoginGoogleUser($loginGoogleInput: LoginGoogleInput!) {
    loginGoogleUser(loginGoogleInput: $loginGoogleInput) {
      id
      email
      username
      createdAt
      googleId
      token
      language
      name
      photo
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($userId: String!) {
    user(id: $userId) {
      id
      email
      username
      createdAt
      googleId
      token
      language
      name
      photo
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      email
      username
      createdAt
      googleId
      token
      language
      name
      photo
    }
  }
`;
