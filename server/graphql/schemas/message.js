const {gql} = require('apollo-server-express');

module.exports = gql`

 type Message {
     id: Int!
     content: String!
     author: User!
     conversation: Conversation!
     reactions: [Reaction!]
     createdAt: String
 }

 extend type Mutation {
     createMessage(content: String!, conversationId: Int!): CreateMessageResponse
 }

 extend type Subscription {
     messageAdded(userId: Int!): Message
 }

 type CreateMessageResponse {
    id: Int!
    content: String!
    createdAt: String!
 }

`;