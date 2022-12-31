import { DataTypes } from 'sequelize';
import sequelize from '../../databases/database';

const Users = sequelize.define('users', {
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
      msg: 'verifique se o numero do bilhete está correto',
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
        msg: 'Email incorreto...!!!',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 250],
        msg: 'password deve conter no minímo 7 digitos contendo caracteres especiais como @ - ! etc!',
      },
    },
  },
  passwordhash: {
    type: DataTypes.VIRTUAL,
  },

}, {

});

/* this.addHook('beforeSave', async (user) => {
  if (!user.password) {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hashSync(user.passwordhash, 10);
  } */
// });

export default Users;
