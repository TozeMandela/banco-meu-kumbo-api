import { Sequelize } from 'sequelize';
import dbConfig from '../../config/config';

const sequelize = new Sequelize(dbConfig);

/* async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

auth(); */
(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();
export default sequelize;
