module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            content: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
            conversationId: DataTypes.INTEGER,
        },
        {},
    );
    Message.associate = function (models) {
        Message.belongsTo(models.User, {foreignKey: 'userId', as: 'author'});
        Message.belongsTo(models.Conversation, {foreignKey: 'conversationId', as: 'conversation'});
        Message.hasMany(models.Reaction, {foreignKey: 'messageId', as: 'reactions'});
    };
    sequelize.sync();

    return Message;
};