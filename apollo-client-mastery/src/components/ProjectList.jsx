// Module 3 component, SOC for backend queries and components
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";

function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Project List</h2>
      <ul>
        {data.projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
