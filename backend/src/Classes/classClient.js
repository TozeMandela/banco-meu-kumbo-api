/* eslint-disable consistent-return */
import Clientes from '../models/clienteTable';
import cleanData from './utils/cleanDataAndValidateBi';

class ClientCla {
  constructor(body) {
    this.body = body;
    this.Erros = [];
  }

  async cadastrar() {
    this.body = cleanData(this.body, this.Erros);

    if (this.Erros.length !== 0) return;

    try {
      await Clientes.create(this.body);
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async show() {
    try {
      const data = Clientes.findAll();
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async showOne(body) {
    try {
      const data = await Clientes.findOne({ where: { nome: body.nome } });
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async delete(body) {
    try {
      const data = await Clientes.findOne({ where: { id: body.id } });
      await Clientes.destroy({ where: { id: body.id } });
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async updates(parametro, body) {
    try {
      const data = await Clientes.findOne({ where: { id: parametro.id } });
      // eslint-disable-next-line no-restricted-syntax
      for (const key in body) {
        // eslint-disable-next-line no-param-reassign
        if (key === 'bi') body[key] = data.bi;
      }
      const dataUpdate = await data.update(body);
      return [data, dataUpdate];
    } catch (error) {
      this.Erros.push(error.message);
    }
  }
}

export default ClientCla;
