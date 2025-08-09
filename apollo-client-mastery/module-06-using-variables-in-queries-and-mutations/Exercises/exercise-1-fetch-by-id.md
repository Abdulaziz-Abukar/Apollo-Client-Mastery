# Exercise 1: Fetch by ID

Create a `ProjectDetails` component that:

- accepts a projectId prop
- Uses `GET_PROJECT_BY_ID`
- displays the project's name & description

```js
//queries
export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    project(id: $id) {
      id
      name
      description
    }
  }
`;
```

```jsx
//ID Grabber Form
import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

function GetProjectByIdForm() {
  const [idValue, setIdValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const enterId = e.target.elements.id.value;
    setIdValue(enterId);
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Type an ID.." required />
        <button type="submit">Get Project</button>
      </form>

      <ProjectDetails projectId={idValue} />
    </>
  );
}

export default GetProjectByIdForm;
```

```jsx
// Detail Lister
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../graphql/queries";

function ProjectDetails({ projectId }) {
  const { error, loading, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
    skip: !projectId,
  });

  if (!projectId) return <p>Please enter an ID!</p>;
  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error: ${error.message}</p>;
  if (!data?.project) return <p>No Data Found</p>;

  return (
    <div>
      <h2>{data.project.name}</h2>
      <p>{data.project.description}</p>
    </div>
  );
}

export default ProjectDetails;
```

```jsx
// component render
import GetProjectByIdForm from "./components/GetProjectByIdForm";
function App() {
  return (
    <div>
      <h1>Apollo Client Mastery</h1>
      <GetProjectByIdForm />
    </div>
  );
}

export default App;
```
