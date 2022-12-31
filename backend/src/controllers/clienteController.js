import ClientCla from '../Classes/classClient';

class Client {
  async add(req, res) {
    const cliente = new ClientCla(req.body);

    await cliente.cadastrar();

    if (cliente.Erros.length !== 0) return res.json({ Erros: cliente.Erros });

    return res.json({ information: 'add is succesful ', cliente: req.body.name });
  }

  async show(req, res) {
    const cliente = new ClientCla();
    const data = await cliente.show();
    if (cliente.Erros.length !== 0) return res.json({ Erros: cliente.Erros });
    return res.json({ listOfClients: data });
  }

  async showOne(req, res) {
    const cliente = new ClientCla();
    const data = await cliente.showOne(req.body);
    if (cliente.Erros.length !== 0) return res.json({ Erros: cliente.Erros });
    return res.json({ client: data });
  }

  async delete(req, res) {
    const cliente = new ClientCla();
    const client = await cliente.delete(req.body);
    if (cliente.Erros.length !== 0) return res.json({ Erros: cliente.Erros });

    return res.json({ delected: client.nome, information: 'succesful' });
  }

  async update(req, res) {
    const cliente = new ClientCla();
    const client = await cliente.updates(req.params, req.body);
    if (cliente.Erros.length !== 0) return res.json({ Erros: cliente.Erros });

    return res.json({ update: client, information: 'succesful' });
  }
}

export default new Client();
