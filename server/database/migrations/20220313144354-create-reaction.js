'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userIds: {
        type:Sequelize.ARRAY(Sequelize.INTEGER),
      },
      emoji: {
        type: Sequelize.STRING
      },
      messageId: {
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Messages',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reactions');
  }
};
