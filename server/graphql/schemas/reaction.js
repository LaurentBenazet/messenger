const {gql} = require('apollo-server-express');

module.exports = gql`

 type Reaction {
     id: Int!
     emoji: String!
     userIds: [Int!]
     messageId: Int!
     createdAt: String
 }

 extend type Mutation {
     addReaction(emoji: String!, messageId: Int!): UpdateReactionResponse
     removeReaction(reactionId: Int!): UpdateReactionResponse
 }
 
 extend type Subscription {
     reactionAdded(conversationId: Int!): Reaction
     reactionRemoved(conversationId: Int!): Reaction
 }

 type UpdateReactionResponse {
    id: Int!
    emoji: String!
    userIds: [Int!]
    createdAt: String!
 }
`;