/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimentos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      assistente_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assistente_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conta_origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conta_destino: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      movimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantia: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('movimentos');
  },
};
