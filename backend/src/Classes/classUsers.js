/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import modelUser from '../models/usersTable';
import cleanData from './utils/cleanDataAndValidateBi';

class UserCla {
  constructor(body) {
    this.body = body;
    this.Erros = [];
  }

  async cadastrar() {
    this.body = cleanData(this.body, this.Erros);

    if (this.Erros > 0) return;

    try {
      await modelUser.create(this.body);
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async findall() {
    try {
      const data = await modelUser.findAll();
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async receiveToken(user) {
    try {
      const data = await modelUser.findOne({ where: { email: user.email } });
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }
}

export default UserCla;
