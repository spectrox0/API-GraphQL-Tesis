
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-Auth.js'); 



const server = new ApolloServer({ 
    typeDefs: graphqlSchema,
    resolvers:resolvers, 
    introspection:true,
    context: isAuth
    });
 
const port = process.env.PORT || 4000; 
mongoose.connect(
`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-oaxis.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then( () => {
  server.listen({ port: port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });
  
}).
catch( err => {
    console.log(err);
    console.log("error no entra")
})