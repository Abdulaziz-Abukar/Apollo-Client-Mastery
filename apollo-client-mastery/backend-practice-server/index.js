const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

// In-memory data
let projects = [
  {
    id: "1",
    name: "Apollo Learning",
    description: "Frontend GraphQL practice project",
  },
  {
    id: "2",
    name: "BugStack Clone",
    description: "The real backend you will build later",
  },
];

// Schema
const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    addProject(name: String!, description: String!): Project!
    updateProject(id: ID!, name: String!, description: String!): Project!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    projects: () => projects,
    project: (_, { id }) => {
      const project = projects.find((project) => project.id === id);
      return project;
    },
  },
  Mutation: {
    addProject: (_, { name, description }) => {
      const newProject = {
        id: String(projects.length + 1),
        name,
        description,
      };
      projects.push(newProject);
      return newProject;
    },
    updateProject: (_, { id, name, description }) => {
      const projectIndex = projects.findIndex((p) => p.id === id);

      if (projectIndex === -1) {
        throw new Error("Project not found");
      }

      const updateProject = { ...projects[projectIndex], name, description };
      projects[projectIndex] = updateProject;
      return updateProject;
    },
  },
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
