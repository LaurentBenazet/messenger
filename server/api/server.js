const express = require('express');
const {createServer} = require('http');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');

const app = express();
app.use(cors());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    subscriptions: {
        path: '/subscriptions'
    },
});

apolloServer.start().then(res => {
    apolloServer.applyMiddleware({ app, path: '/api' });
})

const server = createServer(app);

module.exports = server;