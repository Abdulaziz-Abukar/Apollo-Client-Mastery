// Module 3 component, SOC for backend queries and components
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";

function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  // module 4: enhancement on errors and loading states
  if (loading) {
    return <p>⏳ Loading your projects...</p>;
  }
  if (error) {
    console.error(error); // Debugging purposes
    return <p>🚨 Could not load projects: {error.message}</p>;
  }

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
