require('dotenv').config();

const server = require('./api/server');
const {SubscriptionServer} = require("subscriptions-transport-ws");
const {execute, subscribe} = require("graphql");
const typeDefs = require("./graphql/schemas");
const resolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const port = process.env.PORT || 8080;

process.on('uncaughtException', (err) => {
    console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
    process.exit(0);
});

process.on('unhandledRejection', (err) => {
    console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

server.listen(port, () => {
    console.log(`Apollo Server is now running on http://localhost:${port}/api`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: server,
        path: '/subscriptions',
    });
});
