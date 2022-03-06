module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
      'Conversation',
      {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
      },
      {},
  );
  Conversation.associate = function (models) {
    // associations can be defined here
    Conversation.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    Conversation.hasMany(models.Message, { foreignKey: 'conversationId', as: 'messages' });
  };
  return Conversation;
};