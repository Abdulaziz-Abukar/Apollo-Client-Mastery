# Module 4: Handling Loading & Errors in Apollo Client

## 1. Why Loading & Errors Matter

A common mistake in junior dev apps is skipping user feedback:

```js
const {data} = useQuery(...) // Bad UX if loading fails or is slow
```

in the real world:

- Networks fail
- Backends time out
- Users have slow internet

You need to **guide the user** through loading and failure states

## 2. Loading State

Apollo returns `loading: true` immediately when a query starts

### Basic example:

```js
if (loading) return <p>Loading...</p>;
```

But for good UX, use:

- Loading spinners (`react-spinners`, `@mui/material`, or Tailwind)
- Skeleton UIs (ghost boxes for text/images)
- Placeholder cards

### Better Example:

```jsx
if (loading) {
  return (
    <div className="loading-container">
      <h2>Fetching projects...</h2>
      <div className="spinner"></div>
    </div>
  );
}
```

## 3. Error State

Apollo gives you a full `error` object.

### Basic:

```jsx
if (error) return <p>Error: {error.message}</p>;
```

### Advanced:

```jsx
if (error) {
  console.error(error); // Debugging purposes
  return (
    <div className="error-box">Something went wrong. Please try again</div>
  );
}
```

You can:

- Retry queries with a button
- Show a friendly fallback
- Customize based on `error.networkError` or `error.graphQLErrors`

## 4. (Bonus) `netowrkStatus` for Refetching UI

Apollo exposes more granular loading states through:

```js
const { networkStatus } = useQuery(SOME_QUERY);
```

You can use this to:

- Show "Refreshing..." during refetch
- Differentiate initial loading vs reloading

| `networkStatus` | Meaning           |
| --------------- | ----------------- |
| `1`             | Loading (initial) |
| `2`             | SetVariables      |
| `3`             | FetchMore         |
| `4`             | Refetch           |
| `7`             | Ready             |

Only needed in advanced dashboards, not required for now.
