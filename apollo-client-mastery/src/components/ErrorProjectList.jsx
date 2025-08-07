import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";

function ErrorProjectList() {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_PROJECTS,
    {
      notifyOnNetworkStatusChange: true, // lets loading reflect refetching
      errorPolicy: "all", // surface partial data + errors if server returns both
    }
  );

  const projects = data?.projects ?? [];

  return (
    <div>
      <button onClick={() => refetch()} disabled={loading}>
        {networkStatus === 4 ? "Refreshing..." : "Try Again"}
      </button>

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error.networkError
            ? "Network error. Check your connection and try again."
            : error.graphQLErrors?.[0]?.message || "Something went wrong."}
        </p>
      )}

      {!loading && !error && projects.length === 0 && <p>No projects yet.</p>}

      {projects.length > 0 && (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ErrorProjectList;
