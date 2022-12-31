import express from 'express';
import Conta from '../src/controllers/contaController';
import token from '../middlewares/token';

const route = express.Router();

route.get('/', Conta.show);
route.get('/one', Conta.showOne);
route.get('/extract', Conta.showExtract);
route.post('/dep', token, Conta.depositar);
route.post('/sacar', token, Conta.sacar);
route.post('/', Conta.Create);
route.post('/passar/para', token, Conta.transferir);
route.put('/:id');

export default route;
