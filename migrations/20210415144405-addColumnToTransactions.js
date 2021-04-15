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
      "Transactions",
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    )
     await queryInterface.addColumn(
      "Transactions",
      'garageId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Garages"
          },
          key: 'id'
        },
        allowNull: false,
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
     "Transactions",
     'userId'
   )
    await queryInterface.removeColumn(
     "Transactions",
     'garageId'
   )
  }
};
