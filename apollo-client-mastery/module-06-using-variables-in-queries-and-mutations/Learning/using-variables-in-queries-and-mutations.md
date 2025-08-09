# Module 6: Using Variables in Queries & Mutations

## 1. Why use Variables?

Instead of:

```graphql
query {
  project(id: "123") {
    id
    name
  }
}
```

You can write:

```graphql
query GetProject($id: ID!) {
  project(id: $id) {
    id
    name
  }
}
```

Then pass the `$id` dynamically from your React component

### Benefits of variables:

- Cleaner, reusable queries
- Safer (no manual string concatenation = avoids injection bugs)
- Lets Apollo cache results based on variable values

## 2. Using Variables in `useQuery`

### Step 1: Define the query

```js
// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_PROJECT_BY_ID = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
    }
  }
`;
```

### Step 2: Use in React

```jsx
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../graphql/queries";

function ProjectDetails({ projectId }) {
  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  });

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error: ${error.message}</p>;

  return (
    <div>
      <h2>{data.project.name}</h2>
      <p>{data.project.description}</p>
    </div>
  );
}

export default ProjectDetails;
```

## 3. Using Variables in `useMutation`

Example: Updating a project

### Step 1: Define the mutation

```js
// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String!, $description: String!) {
    updateProject(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
```

### Step 2: Use in React

```jsx
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../graphql/mutations";

function UpdateProjectForm({ project }) {
  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject({
      variables: {
        id: project.id,
        name: e.target.name.value,
        description: e.target.description.value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" defaultValue={project.name} required />
      <input name="description" defaultValue={project.description} required />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Project"}
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
}

export default UpdateProjectForm;
```

## 4. Passing Variables from User Input

you can capture values from:

- Text fields
- Dropdowns
- URL params (`useParams` from React Router)
- Button clicks (pass a variable onClick)

## Summary

- GraphQL variables make queries/mutations dynamic and reusable
- Pass them through `variables` in `useQuery` / `useMutation` options
- Apollo caches results separately per variable set
- Essential for user-driven apps (search, filtering, editing)
