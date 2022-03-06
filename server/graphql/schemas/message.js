const { gql } = require('apollo-server-express');

module.exports = gql`

 type Message {
     id: Int!
     content: String!
     author: User!
     conversation: Conversation!
     createdAt: String
 }

 extend type Mutation {
     createMessage(content: String!, conversationId: Int!): CreateMessageResponse
 }

 type CreateMessageResponse {
    id: Int!
    content: String!
    createdAt: String!
 }

`;