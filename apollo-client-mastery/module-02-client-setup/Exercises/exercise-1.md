```arduino
<App.jsx> uses `useQuery(GET_PROJECTS)`
    ↓
Apollo Client sends GraphQL request to `http://localhost:4000/graphql`
    ↓
Apollo Server resolves `projects` query and sends data back
    ↓
Apollo Client receives data and re-renders the component

```
