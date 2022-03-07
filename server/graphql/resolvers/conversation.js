const {Conversation, User} = require('../../database/models');

const {AuthenticationError, ForbiddenError} = require('apollo-server-express');

module.exports = {
    Mutation: {
        async createConversation(_, {usersId}, {user = null}) {
            if (!user) {
                throw new AuthenticationError('You must login to create a conversation');
            }
            if (!usersId || usersId.size < 2) {
                throw new ForbiddenError('A conversation must contain at least two users');
            }

            const conversation = await Conversation.create();

            conversation.addParticipants(usersId);

            return conversation;
        },
    },

    Query: {
        async getAllConversations(root, args, context) {
            return Conversation.findAll({
                include: [{
                    model: User,
                    as: "participants",
                },
                ]
            });
        },
        async getSingleConversation(_, {conversationId}, context) {
            return Conversation.findByPk(conversationId, {
                include: [{
                    model: User,
                    as: "participants",
                },
                ]
            })
        },
    },

    Conversation: {
        messages(conversation) {
            return conversation.getMessages();
        },
        participants(conversation) {
            return conversation.getParticipants();
        }
    },
};