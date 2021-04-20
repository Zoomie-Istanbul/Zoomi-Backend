'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      "Chats",
      'userChatId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'UserChats'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
    await queryInterface.addColumn(
      "UserChats",
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
     await queryInterface.addColumn(
      "UserChats",
      'garageId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Garages'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn(
      "Chats",
      'userChatId'
    )
     await queryInterface.removeColumn(
      "UserChats",
      'garageId'
    )
     await queryInterface.removeColumn(
      "UserChats",
      'userId'
    )
  }
};
