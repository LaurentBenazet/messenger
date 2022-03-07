const {gql} = require('apollo-server-express');
const userType = require('./user')
const conversationType = require('./conversation')
const messageType = require('./message')

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }
 type Subscription {
    root: String
 }

`;

module.exports = [rootType, userType, conversationType, messageType];