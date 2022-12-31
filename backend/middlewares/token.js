import jwt from 'jsonwebtoken';
import listOfUser from '../src/models/usersTable';
// eslint-disable-next-line consistent-return
const jwtoken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.json({ Error: 'precisa logar...' });

  const [, token] = authorization.split(' ');

  const isUser = jwt.verify(token, process.env.TOKEN_SECREET);

  try {
    const data = await listOfUser.findOne({ where: { email: isUser.email } });
    if (data.length === 0) return res.json({ Error: 'precisa fazer login...' });

    const {
      nome, email, telefone,
    } = data;
    res.locals.user = {
      nome, email, telefone,
    };
  } catch (error) {
    return res.json({ Error: 'erro in connection with databases...' });
  }

  next();
};

export default jwtoken;
