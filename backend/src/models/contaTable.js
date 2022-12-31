import { DataTypes } from 'sequelize';
import sequelize from '../../databases/database';
import Clientes from './clienteTable';

const Conta = sequelize.define('contas', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Número de conta em uso',
    },
  },
  saldo: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.00,
  },
  iban: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'iban existente...!',
    },
  },
  tipo_conta: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'CP',
  },
  cliente_id: {
    type: DataTypes.INTEGER,
  },
});
Clientes.hasOne(Conta, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Conta.belongsTo(Clientes, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Conta;
