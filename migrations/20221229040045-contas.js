/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      saldo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      iban: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      tipo_conta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('contas');
  },
};
