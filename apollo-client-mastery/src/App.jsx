import { gql, useQuery } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {data.projects.map((project) => (
          <li>
            <strong>{project.name}</strong>:
          </li>
        ))}
      </ul>
      {console.log(data)}
    </div>
  );
}

export default App;
