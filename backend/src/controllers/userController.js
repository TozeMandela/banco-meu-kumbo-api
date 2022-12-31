import jwt from 'jsonwebtoken';
import UserM from '../Classes/classUsers';

class Users {
  async cadastrar(req, res) {
    const user = new UserM(req.body);

    await user.cadastrar();

    if (user.Erros.length > 0) return res.json({ Erros: user.Erros });

    return res.json({ information: 'add is succesful ', user: req.body.name });
  }

  async show(req, res) {
    const user = new UserM(req.body);

    const users = await user.findall();

    if (user.Erros.length > 0) return res.json({ Erros: user.Erros });

    return res.json({ information: 'List of Users', users, admin: res.locals.user });
  }

  async addTocken(req, res) {
    const user = new UserM();
    const users = await user.receiveToken(req.body);
    if (!users) return res.json({ Erros: 'insira credênciais validas' });

    const {
      id, nome, email, password,
    } = users;

    const token = jwt.sign({
      id, nome, email, password,
    }, process.env.TOKEN_SECREET, { expiresIn: process.env.DURATION });

    if (user.Erros.length > 0) return res.json({ Erros: user.Erros });

    return res.json({
      information: 'your token',
      user: {
        id, nome, email, password,
      },
      token,
    });
  }
}
export default new Users();
