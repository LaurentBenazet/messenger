module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
      'Conversation',
      {},
  );
  Conversation.associate = function (models) {
    // associations can be defined here
    Conversation.belongsToMany(models.User, {through: 'ConversationParticipants', foreignKey: 'conversationId', as: 'participants', otherKey: 'userId'});
    Conversation.hasMany(models.Message, { foreignKey: 'conversationId', as: 'messages' });
  };

  return Conversation;
};