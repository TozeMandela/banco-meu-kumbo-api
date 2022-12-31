/* eslint-disable consistent-return */
import Conta from '../Classes/classConta';

class ContaC {
  async Create(req, res) {
    const conta = new Conta();
    const data = await conta.create(req.body);

    const {
      numero, iban, tipo_conta, client_id, saldo,
    } = data;

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });

    return res.json({
      information: 'Create Account succesful',
      contaCreated: {
        numero, iban, tipo_conta, client_id, saldo,
      },
    });
  }

  async show(req, res) {
    const list = [];
    const conta = new Conta();
    const datas = await conta.show();
    datas.forEach((data) => {
      const {
        numero, iban, tipo_conta, saldo,
      } = data;
      const {
        nome, sobrenome, bi, email, telefone,
      } = data.cliente;
      list.push({
        nome, sobrenome, bi, email, telefone, numero, iban, tipo_conta, saldo,
      });
    });

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });

    res.json({
      list: 'list Of Account',
      data: list,
    });
  }

  async showOne(req, res) {
    const list = [];
    const conta = new Conta();
    const data = await conta.showOne(req.body);
    const {
      numero, iban, tipo_conta, saldo,
    } = data;
    const {
      nome, sobrenome, bi, email, telefone,
    } = data.cliente;
    list.push({
      nome, sobrenome, bi, email, telefone, numero, iban, tipo_conta, saldo,
    });

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });

    res.json({
      list: 'cliente conta',
      data: list,
    });
  }

  async depositar(req, res) {
    const { numero, quantia } = req.body;
    const conta = new Conta();
    const deposito = await conta.depositar(numero, quantia, res.locals.user);

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });
    res.json({ deposito });
  }

  async sacar(req, res) {
    const { numero, quantia } = req.body;
    const conta = new Conta();
    const deposito = await conta.sacar(numero, quantia, res.locals.user);

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });
    res.json({ deposito });
  }

  async transferir(req, res) {
    const { origem, destino, quantia } = req.body;
    const conta = new Conta();
    const data = await conta.transferencia(origem, destino, quantia, res.locals.user);
    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });
    res.json({ tranferencia_de: data[0], para: data[1] });
  }

  async showExtract(req, res) {
    const conta = new Conta();
    const data = await conta.extract(req.body);

    if (conta.Error.length !== 0) return res.json({ Error: conta.Error });

    return res.json({ extracto: data });
  }
}

export default new ContaC();
