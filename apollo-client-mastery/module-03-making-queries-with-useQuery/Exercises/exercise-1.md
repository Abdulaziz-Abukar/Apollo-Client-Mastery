# Exercise 1: Describe the Flow

What does `useQuery` do?

- It sends a GraphQL query to your backend and automatically tracks loading state, error state, and gives you the final data results

What does it return?

- `useQuery` returns upon query succession, the data it asked for in a data object variable.

What happens when a query succeeds or fails?

- When a query succeeds, the data is sent and receieved and can be used to manipulate and display it on the UI. If it fails, the frontend receives an error object displaying the type of error that caused it to fail on fetching the data.
