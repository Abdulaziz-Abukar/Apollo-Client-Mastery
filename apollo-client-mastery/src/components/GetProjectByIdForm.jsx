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
