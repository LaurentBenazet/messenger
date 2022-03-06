const { Conversation } = require('../../database/models');

const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports = {
    Mutation: {
        async createMessage(_, { content, conversationId }, { user = null }) {
            if (!user) {
                throw new AuthenticationError('You must login to create a message');
            }

            const conversation = await Conversation.findByPk(conversationId);

            if (conversation) {
                return conversation.createMessage({ content, userId: user.id });
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
};