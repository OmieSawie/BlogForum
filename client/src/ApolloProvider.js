import React from "react";
import App from "./App";
import ApolliClient from "apollo-client";
import { InMemoryCacche } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolliClient({
  link: httpLink,
  cache: new InMemoryCacche(),
});

export default {};
