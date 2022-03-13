const {gql} = require('apollo-server-express');

module.exports = gql`

 type Reaction {
     id: Int!
     emoji: String!
     userIds: [Int!]
     message: Message!
     createdAt: String
 }

 extend type Mutation {
     addReaction(emoji: String!, messageId: Int!): UpdateReactionResponse
     removeReaction(reactionId: Int!): UpdateReactionResponse
 }

 type UpdateReactionResponse {
    id: Int!
    emoji: String!
    userIds: [Int!]
    createdAt: String!
 }
`;