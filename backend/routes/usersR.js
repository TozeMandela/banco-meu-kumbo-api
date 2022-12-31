import express from 'express';
import Users from '../src/controllers/userController';
import token from '../middlewares/token';

const route = express.Router();

route.post('/', Users.cadastrar);
route.get('/', token, Users.show);
route.get('/token', Users.addTocken);

export default route;
