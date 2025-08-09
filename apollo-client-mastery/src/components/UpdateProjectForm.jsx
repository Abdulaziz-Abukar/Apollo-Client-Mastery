import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../graphql/mutations";
import { GET_PROJECTS } from "../graphql/queries"; // optional, for refetch

function UpdateProjectForm({ project }) {
  const [form, setForm] = useState({
    name: project.name,
    description: project.description,
  });
  const [message, setMessage] = useState("");

  const [updateProject, { loading, error, data }] = useMutation(
    UPDATE_PROJECT,
    {
      // Simple approach: refetch the list so UI reflects changes
      refetchQueries: [{ query: GET_PROJECTS }],
      onCompleted: () => setMessage("✅ Project updated!"),
    }
  );

  // keep local form in sync if parent sends a new project
  useEffect(() => {
    setForm({ name: project.name, description: project.description });
  }, [project.id, project.name, project.description]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setMessage(""); // clear previous success on edit
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProject({
      variables: {
        id: project.id,
        name: form.name.trim(),
        description: form.description.trim(),
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 8, maxWidth: 420 }}
    >
      <h3>Edit Project</h3>

      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Project name"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Project"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {/* Optional debug */}
      {/* {data && <pre>{JSON.stringify(data.updateProject, null, 2)}</pre>} */}
    </form>
  );
}

export default UpdateProjectForm;
