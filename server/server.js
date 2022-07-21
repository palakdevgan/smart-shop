const express = require('express');

// ApolloServer imports
const {ApolloServer} = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schemas');

const {authMiddleWare} = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// creates new Apollo server and passes in schema data
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleWare
  });
  await server.start();
  server.applyMiddleware({app});
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer()


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
