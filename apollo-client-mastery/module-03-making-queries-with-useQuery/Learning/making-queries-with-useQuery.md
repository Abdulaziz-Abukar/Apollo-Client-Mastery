# Module 3: Making Queries with `useQuery`

## 1. What is `useQuery()`

`useQuery` is a **React hook** provided by Apollo Client.

It's used to send a **GraphQL `query`** to your backend and automatically:

- Tracks loading state (`loading`)
- Tracks error state (`error`)
- Gives you the final result (`data`)

### Basic Usage

```jsx
import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      description
    }
  }
`;

function ProjectList() {
    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul>
            {data.projects.map((project) => (
                <li key={project.id}>{project.name}</p>
            ))}
        </ul>
    )
}
export default ProjectList;
```

## 2. What does `useQuery()` Return?

```js
const { loading, error, data } = useQuery(SOME_QUERY);
```

| Value     | Description                        |
| --------- | ---------------------------------- |
| `loading` | `true` while the query is fetching |
| `error`   | GraphQL or network error           |
| `data`    | Your result from the server        |

it **auto-updates** when:

- You navigate back to this component
- The same query is used elsewhere (Apollo Cache)

## 3. Best Practice: Separate Your Queries

Instead of writing your GraphQL queries inline, extract them into a dedicated folder:

```bash
📁 src/graphql
├── 📄 queries.js

```

### Example:

```js
// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
    }
  }
`;
```

then in your component:

```js
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";
```

## 4. Dev Workflow Tips

- Use `console.log(data)` to explore shapes
- Use Apollo DevTools (Chrome extension) to inspect queries/cache
- Use `React.StrictMode` to test query re-renders
- Wrap your component in error/loading states - NEVER SKIP THIS!

## Summary

- `useQuery()` lets you fetch GraphQL data with minimal code
- `Apollo` automatically tracks loading/error states
- You can separate queries into their own files for better modularity
- You now have a reusable query-based data flow working in React
