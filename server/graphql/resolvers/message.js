const {Conversation} = require('../../database/models');
const {ApolloError} = require('apollo-server-express');
const {PubSub, withFilter} = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
    Mutation: {
        async createMessage(_, {content, conversationId, userId}) {
            const conversation = await Conversation.findByPk(conversationId);

            if (conversation) {
                const message = await conversation.createMessage({content, conversationId, userId});

                await pubsub.publish('messageAdded', message);

                return message;
            }
            throw new ApolloError('Unable to create a message');
        },
    },

    Message: {
        author(message) {
            return message.getAuthor();
        },
        conversation(message) {
            return message.getConversation();
        },
    },

    Subscription: {
        messageAdded: {
            subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
                return payload.dataValues.userId === variables.userId;
            }),
            resolve: (payload) => {
                return payload;
            },
        }
    }
};