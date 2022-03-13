const {Message, Reaction} = require('../../database/models');
const {ApolloError, AuthenticationError} = require('apollo-server-express');
const {PubSub, withFilter} = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
    Mutation: {
        async addReaction(_, {emoji, messageId}, {user = null}) {
            if (!user) {
                throw new AuthenticationError('You must login to react to a message');
            }

            const message = await Message.findByPk(messageId);

            if (message) {
                const reactions = await message.getReactions();
                let reaction = reactions && reactions.find(element => element.dataValues.emoji === emoji);
                const userId = user.id;

                if (reaction) {
                    const userIds = reaction.dataValues.userIds;
                    if (!userIds.includes(userId)) {
                        userIds.push(userId);
                        await Reaction.update({userIds: userIds}, {
                            where: {
                                id: reaction.dataValues.id
                            }
                        })
                    }
                    return reaction;
                } else {
                    return message.createReaction({emoji, messageId, userIds: [userId]});
                }
            }

            throw new ApolloError('Unable to create a reaction');
        },

        async removeReaction(_, {reactionId}, {user = null}) {
            if (!user) {
                throw new AuthenticationError('You must login to remove a reaction to a message');
            }

            const reaction = await Reaction.findByPk(reactionId);

            if (reaction) {
                const userId = user.id;

                const userIds = reaction.dataValues.userIds;

                const index = userIds.indexOf(userId);

                if (index > -1) {
                    userIds.splice(index, 1);
                    if (userIds.length === 1) {
                        await Reaction.destroy({
                            where: {
                                id: reaction.dataValues.id
                            }
                        })
                    } else {
                        await Reaction.update({userIds: userIds}, {
                            where: {
                                id: reaction.dataValues.id
                            }
                        })
                    }

                    return reaction;
                } else {
                    throw new ApolloError('Unable to remove a reaction the user hasn\'t done !');
                }
            }

            throw new ApolloError('Unable to remove a reaction');
        },
    },

    Reaction: {
        userIds(reaction) {
            return reaction.dataValues.userIds;
        },
    }
};