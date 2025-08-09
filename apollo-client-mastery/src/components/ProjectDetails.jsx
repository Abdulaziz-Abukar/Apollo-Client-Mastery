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
