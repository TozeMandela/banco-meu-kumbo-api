import { DataTypes } from 'sequelize';
import sequelize from '../../databases/database';

const Clientes = sequelize.define('clientes', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bi: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'verifique se o numero do bilhete está correto, pois ele é único',
    },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  morada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'o email têm que ser valido!',
      },
    },
  },
}, {

});

export default Clientes;
