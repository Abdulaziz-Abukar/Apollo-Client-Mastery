# Making Mutations with `useMutation`

## 1. What is a Mutation?

In GraphQL, **queries** are for **reading** data, and **mutations** are for **writing** data.  
Mutations can **create**, **update**, or **delete** resources.

Example mutation syntax:

```graphql
mutation AddProject($name: String!, $description: String!) {
  addProject(name: $name, description: $description) {
    id
    name
    description
  }
}
```

## 2. Using `useMutation()`

basic structure in React:

```jsx
const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);

addProject({ variables: { name: "New Project", description: "Test" } });
```

## 3. Step-by-Step in Your App

### Step 1: Add the Mutation to `src/graphql/mutations.js`

Create a new file:

```js
// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!) {
    addProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
```

### Step 2: Create a Form Component

```jsx
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../graphql/mutations";
import { GET_PROJECTS } from "../graphql/queries";

function AddProjectForm() {
  const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }], // refresh project list after mutation
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;

    addProject({ variables: { name, description } });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Project name" required />
      <input name="description" placeholder="Description" required />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  );
}

export default AddProjectForm;
```

### Step 3: Render the Form + Project List

```jsx
import ProjectList from "./components/ProjectList";
import AddProjectForm from "./components/AddProjectForm";

function App() {
  return (
    <div>
      <h1>Projects</h1>
      <AddProjectForm />
      <ProjectList />
    </div>
  );
}

export default App;
```

### Step 4: Updating the UI Without Refetch

Instead of `refetchQueries`, you can update the Apollo cache manually:

```js
const [addProject] = useMutation(ADD_PROJECT, {
  update(cache, { data: { addProject } }) {
    cache.modify({
      fields: {
        projects(existingProjects = []) {
          return [...existingProjects, addProject];
        },
      },
    });
  },
});
```

this is more efficient because it updates UI instantly without making another request.

## Summary

- `useMutation()` works like `useQuery()`, but for sending data changes
- You pass `variables` to supply dynamic data
- Handle mutation `loading` and `error` just like queries
- Update UI with either:  
  `refetchQueries` (simple, extra request)  
  Cache modification (efficient, more advanced)
