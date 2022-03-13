const userResolvers = require('./user');
const conversationResolvers = require('./conversation');
const messageResolvers = require('./message');
const reactionResolvers = require('./reaction');

module.exports = [userResolvers, conversationResolvers, messageResolvers, reactionResolvers];
