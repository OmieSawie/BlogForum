// const { ApolloServer,PubSub } = require("apollo-server");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config.js");
const typeDefs = require("./graphQL/resolvers/typeDefs.js");
const resolvers = require("./graphQL/resolvers");

// const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => ({ req, pubSub }),
  context: ({ req }) => ({ req }),
});

mongoose
  .set("strictQuery", false)
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log("Hello World!");
    console.log(`Server running at ${res.url}`);
  });
