# Exercise 2: Handle Fake Errors

Temporarily break your server schema (like rename projects to projectList) and obesrve what happens in your UI

Then:

- Write a user-friendly error message
- Log the full error object in the console
- Add a "Try Again" button that refetches the query using `refetch()`
