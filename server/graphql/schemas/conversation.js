const { gql } = require('apollo-server-express');

module.exports = gql`

 type Conversation {
     id: Int!
     title: String!
     content: String!
     author: User!
     messages: [Message!]
     createdAt: String
 }

extend type Query {
    getAllConversations: [Conversation!]
    getSingleConversation(conversationId: Int!): Conversation
}

 extend type Mutation {
     createConversation(title: String!, content: String!): CreateConversationResponse
 }

 type CreateConversationResponse {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
 }

`;