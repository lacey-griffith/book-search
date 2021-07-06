const express = require('express');
const path = require('path');

//import Apollo server
const { ApolloServer } = require('apollo-server-express')

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')

const db = require('./config/connection');

//import JWT middleware
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//new Apollo server
const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware})

// use express middleware
server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
