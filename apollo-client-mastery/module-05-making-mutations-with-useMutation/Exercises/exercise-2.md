# Exercise 2: Instant UI Update

Change your form so that **new projects appear instanty** without waiting for a refetch, by modifying the Apollo cache in the `update()` function.

```jsx
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
```
