import { DataTypes } from 'sequelize';
import sequelize from '../../databases/database';

const Movimentos = sequelize.define('movimentos', {
  assistente_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assistente_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conta_origin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  conta_destino: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  movimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantia: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {});

export default Movimentos;
