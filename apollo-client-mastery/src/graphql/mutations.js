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
