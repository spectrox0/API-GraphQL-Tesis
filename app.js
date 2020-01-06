const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { RedisCache } = require("apollo-server-cache-redis");
const responseCachePlugin = require("apollo-server-plugin-response-cache");
const graphqlSchema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-Auth.js");
const subscriptions = require("./middleware/suscriptions.js");

const server = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers,
  introspection: true,
  // tracing: true,
  cacheControl: true,
  cache: new RedisCache({
    host: "redis-17988.c14.us-east-1-2.ec2.cloud.redislabs.com",
    port: 17988,
    name: "Tesis-Graphql",
    password: process.env.REDIS_PASSWORD
  }),
  plugins: [responseCachePlugin()],
  context: isAuth,
  subscriptions
});

const port = process.env.PORT || 4000;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-oaxis.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen({ port }).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
