const { gql } = require('apollo-server-express');

module.exports = gql`

 type Conversation {
     id: Int!
     participants: [User!]
     messages: [Message!]
     createdAt: String
 }

extend type Query {
    getAllConversations: [Conversation!]
    getSingleConversation(conversationId: Int!): Conversation
}

 extend type Mutation {
     createConversation(usersId:[Int!]!): CreateConversationResponse
 }

 type CreateConversationResponse {
    id: Int!
    createdAt: String!
    participants: [User!]
 }

`;