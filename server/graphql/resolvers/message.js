const {Conversation} = require('../../database/models');
const {ApolloError, AuthenticationError} = require('apollo-server-express');
const {PubSub, withFilter} = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
    Mutation: {
        async createMessage(_, {content, conversationId},{user = null}) {
            if (!user) {
                throw new AuthenticationError('You must login to write a message');
            }

            const conversation = await Conversation.findByPk(conversationId);

            if (conversation) {
                const userId = user.id;
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
        reactions(message) {
            return message.getReactions();
        }
    },

    Subscription: {
        messageAdded: {
            subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), async (payload, variables) => {
                const conversation = await Conversation.findByPk(payload.dataValues.conversationId);
                const participants = await conversation.getParticipants();

                return participants.some(participant => participant.dataValues.id === variables.userId);
            }),
            resolve: (payload) => {
                return payload;
            },
        }
    }
};