import { useMutation } from "@apollo/client";
import { ADD_PROJECTS } from "../graphql/mutations";

function AddProjectForm() {
  const [addProject, { loading, error }] = useMutation(ADD_PROJECTS, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;

    addProject({ variables: { name, description } });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Project Name" required />
      <input
        type="text"
        name="description"
        placeholder="Project Description"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  );
}

export default AddProjectForm;
