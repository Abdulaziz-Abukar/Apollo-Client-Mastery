import { gql } from "@apollo/client";

export const ADD_PROJECTS = gql`
  mutation AddProject($name: String!, $description: String!) {
    addProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String!, $description: String!) {
    updateProject(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
