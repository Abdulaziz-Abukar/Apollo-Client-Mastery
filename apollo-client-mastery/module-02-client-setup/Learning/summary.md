# Client Setup

## Step 1: Install Apollo Client in Your React App

```bash
npm install @apollo/client graphql
```

## Step 2: Create Apollo Client Instance

Inside `src/`, create a new file:

```bash
src/apolloClient.js
```

### Purpose of apolloClient

The purpose of the apolloClient.js file is used to configure and initialize a single instance of Apollo Client that will be shared across your frontend application. It acts as the central place where you define how your app interacts with your GraphQL Backend.

#### What Typically goes inside `apolloClient.js`

- **Import dependencies** (from `@apollo/client`)  
  `ApolloClient` - the main client instance  
  `InMemoryCache` - for caching query results  
  `HttpLink` - defines the GraphQL server endpoint

- **Set up the client**  
  Define the GraphQL endpoint (e.g. `/graphql`)  
  Configure cache strategy  
  Optionally add auth headers, error handling, etc.

- **Export the clinet instance** so it can be used in your app (usually passed to `<ApolloProvider>` in `index.js` or `App.jsx`)

#### Example:

```js
import { ApolloClient, inMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache(),
});

export default client;
```

## Step 3: Wrap App in `ApolloProvider`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

#### Why Wrap `<App />` with `<ApolloProvier>` in `main.jsx`

`ApolloProvider` is a React context provider that makes your Apollo Client instance available throughout your React component tree. By wrapping `<App />` with it in `main.jsx`, you're enabling **GraphQL queries and mutations** to work anywhere in your app.

#### What it does

- Injects the Apollo Client instance (from `apolloClient.js`) into React context
- Allows you to use Apollo hooks like:  
  `useQuery()`  
  `useMutation()`  
  `useSubscription()`  
  ..anywhere inside `<App />` or its children

- ensures only one **Apollo Client** instance is used app-wide (which is important for caching and performance)
