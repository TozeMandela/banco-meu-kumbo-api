/* eslint-disable new-cap */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { or, and } from 'sequelize';
import Clientes from '../models/clienteTable';
import modelConta from '../models/contaTable';
import Movimentos from '../models/movimentos';
import tipo from './utils/movimentosR';

class Conta {
  constructor() {
    this.Error = [];
  }

  geraNumberCount() {
    let num = [];
    for (let i = 0; i < 8; i += 1) {
      num.push(Math.floor((Math.random() * 10) - 0));
    }
    num = num.join('');
    return num;
  }

  geraIban(conta) {
    const p1 = [];
    const p2 = [];
    conta = conta.split('');

    for (let i = 0; i < 8; i += 1) {
      if (i <= 3) p1.push(conta[i]);
      if (i > 3) p2.push(conta[i]);
    }

    return `AO06 0040 0000 ${p1.join('')} ${p2.join('')} 1015 6`;
  }

  async saveAccount(obj) {
    try {
      console.log(obj);
      if (this.Error.length !== 0) return;
      const data = await modelConta.create(obj);
      return data;
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      this.Error.push('erros ao cosultar');
    }
  }

  async create(body) {
    let { tipo_conta, cliente_id, saldo } = body;
    tipo_conta = tipo_conta.toUpperCase();
    const numero = this.geraNumberCount();
    try {
      const existCount = await modelConta.findAll({ where: { numero } });
      if (existCount.length !== 0) await this.create(body);

      if (this.Error.length !== 0) return;

      const iban = this.geraIban(numero);

      const data = await this.saveAccount({
        numero, iban, tipo_conta, cliente_id, saldo,
      });

      return data;
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      this.Error.push('erros ao cosultar');
    }
  }

  async show() {
    try {
      const data = modelConta.findAll({ include: Clientes });
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async showOne(n) {
    try {
      const data = modelConta.findOne({ where: { numero: n.number }, include: Clientes });
      return data;
    } catch (error) {
      this.Erros.push(error.message);
    }
  }

  async depositar(numConta, quantia, assistente = null, isTransf = false) {
    try {
      if (numConta.length !== 8) return this.Error.push('numero de conta a depositar/tranferir invalido');
      const data = await modelConta.findOne({ where: { numero: numConta } });
      if (data.length === 0) {
        if (!isTransf) return this.Error.push('credecial invalida');

        return this.Error.push('credecial origem invalida');
      }

      const saldo = await data.saldo + quantia;
      if (!isTransf) await new tipo().tipoM(assistente, 'depositou', numConta, ' ', quantia);
      return await data.update({ saldo });
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      return this.Error.push('erros ao depositar');
    }
  }

  async sacar(numConta, quantia, assistente = null, isTranfer = false) {
    try {
      if (numConta.length !== 8) return this.Error.push('numero de conta a sacar/descontar invalido');
      const data = await modelConta.findOne({ where: { numero: numConta } });
      if (data.length === 0) return this.Error.push('credecial destino invalida');
      if (data.saldo < quantia) {
        if (!isTranfer) {
          return this.Error.push('Saldo insuficiente');
        }
        return this.Error.push('Saldo destino insuficiente');
      }
      const saldo = await data.saldo - quantia;

      if (!isTranfer) await new tipo().tipoM(assistente, 'levantou', numConta, ' ', quantia);
      return await data.update({ saldo });
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      return this.Error.push('erros ao depositar');
    }
  }

  async transferencia(cOrigin, cDestinate, quantia, assistente) {
    try {
      const origem1 = await this.sacar(cOrigin, quantia, true);
      if (this.Error.length !== 0) return;
      const destino1 = await this.depositar(cDestinate, quantia, true);
      if (this.Error.length !== 0) {
        await this.depositar(cOrigin, quantia);
        return;
      }

      await new tipo().tipoM(assistente, 'transferencia', cOrigin, cDestinate, quantia);
      return [origem1, destino1];
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      return this.Error.push('erros ao tranferir');
    }
  }

  async extract(user) {
    try {
      return await Movimentos.findAll({
        where: and(
          {
            conta_origin: user.number_account,
          },
          or({ conta_destino: user.number_account }),
        ),
      });
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
      return this.Error.push('erros ao trazer o extrato');
    }
  }
}

export default Conta;
