const {Conversation, User} = require('../../database/models');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const {withFilter, PubSub} = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
    Mutation: {
        async createConversation(_, {usersId}, {user = null}) {
            if (!user) {
                throw new AuthenticationError('You must login to create a conversation');
            }
            if (!usersId || usersId.size < 2) {
                throw new ForbiddenError('A conversation must contain at least two users');
            }

            usersId.push(user.id);

            const conversation = await Conversation.create();

            conversation.addParticipants(usersId);

            await pubsub.publish('conversationAdded', conversation);

            return conversation;
        },
    },

    Query: {
        async getAllConversations(root, args, context) {
            return context.user.getConversations({order: [['createdAt', 'DESC']]});
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

    Subscription: {
        conversationAdded: {
            subscribe: withFilter(() => pubsub.asyncIterator('conversationAdded'), async (payload, variables) => {
                const conversation = await Conversation.findByPk(payload.dataValues.id);
                const participants = await conversation.getParticipants();

                return participants.some(participant => participant.dataValues.id === variables.userId);
            }),
            resolve: (payload) => {
                return payload;
            },
        }
    }
};