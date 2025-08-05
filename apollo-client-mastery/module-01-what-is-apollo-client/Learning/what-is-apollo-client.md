# Module 1: What is Apollo Client

## 1. What is Apollo Client?

**Apollo Client** is a JavaScript library that lets your React app **communicate with a GraphQL backend**, manage data fetching, caching, and state management - all in one.

It's built to solve 3 big problems:

1. **Fetching data from GraphQL servers easily**
2. **Managing the server response (loading, error, success)**
3. **Caching responses to avoid duplicate requests**

### Think of it Like this:

Apollo Client is like the "**data brain**" of your frontend.

```txt
[React App] ←——→ [Apollo Client] ←——→ [GraphQL Server]
        ↕                ↕                   ↕
    Your UI      Data fetching &       MongoDB/Postgres/etc.
                  caching logic
```

Instead of calling `fetch()` or `axious.get()` like REST, you use:

```jsx
useQuery(GET_PROJECTS);
useMutation(CREATE_PROJECT);
```

## 2. Why Use Apollo Client Over REST?

| Feature               | REST                    | GraphQL + Apollo Client            |
| --------------------- | ----------------------- | ---------------------------------- |
| Overfetching          | 🔴 Yes                  | ✅ No (ask for only what you need) |
| Multiple requests     | 🔴 Multiple round trips | ✅ 1 request with nested data      |
| Manual state handling | 🔴 Yes                  | ✅ Built-in loading/error/data     |
| Caching               | 🔴 DIY                  | ✅ Built-in normalized cache       |
| Developer tooling     | 🔴 Minimal              | ✅ Apollo DevTools, VS Code tools  |

## 3. What APollo Client Actually Does

Here's what APollo Client helps with:

- Connects to your GraphQL server (`ApolloProvider`)
- Sends GraphQL queries/mutations via hooks (`useQuery`, `useMutation`)
- Tracks **loading / error / data** states
- Stores responses in a **normalized in-memory cache**
- Can persist cache (optional)
- Supports pagination, subscriptions, fragments, optimistic UI, etc.

## 4. Real-World Example

```jsx
import { useQuery, gql} from `@apollo/client`;

const GET_PROJECTS = gql`
    query {
        myProjects {
            id
            name
        }
    }
`;

function ProjectList() {
    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading..</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.myProjects.map((p) => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
}
```

Notice how:

- Apollo tracks `loading`, `error`, and `data`
- You only write one `useQuery` call - no manual `fetch`, `try/catch`, etc.
- It uses real GraphQL query syntax

## 5. Where Apollo Client Lives in the Stack

```txt
Browser (React)
│
├── Apollo Client (data layer)
│     ├── Sends queries/mutations
│     └── Caches results
│
└── Apollo Server (Node.js GraphQL API)
      └── Talks to MongoDB, Postgres, etc.
```

you write queries in React. Apollo Client sends them to Apollo Server.

## Summary

- Apollo Clinet is the **standard** for using GraphQL in frontend apps
- It replaces manual `fetch()` or `axios` logic
- it \*\*manages data, cache, errors, and loading - letting you focus on UI
- It connects seamlessly to your Apollo Server backend
- It's your **frontend GraphQL engine**
