module.exports = (sequelize, DataTypes) => {
    const Reaction = sequelize.define(
        'Reaction',
        {
            emoji: DataTypes.STRING,
            userIds: DataTypes.ARRAY(DataTypes.INTEGER),
            messageId: DataTypes.INTEGER,
        },
        {},
    );
    Reaction.associate = function (models) {
        Reaction.belongsTo(models.Message, {foreignKey: 'messageId', as: 'message'});
    };
    sequelize.sync();

    return Reaction;
};