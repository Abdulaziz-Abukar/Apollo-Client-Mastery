# Exercise 2: Custom Component

```jsx
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";

function FeaturedProjects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.projects.filter((project) => project.name.includes("Apollo"))
        .length === 0 ? (
        <p>There is no project with name Apollo</p>
      ) : (
        <ul>
          {data.projects
            .filter((project) => project.name.includes("Apollo"))
            .map((project) => (
              <li key={project.id}>
                <strong>{project.name}</strong> - {project.description}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default FeaturedProjects;
```
