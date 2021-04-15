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
      "Orders",
      'transactionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Transactions"
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
      "Orders",
      'transactionId'
    )
  }
};
