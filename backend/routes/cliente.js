import express from 'express';
import Client from '../src/controllers/clienteController';

const route = express();

route.get('/', Client.show);
route.get('/one/', Client.showOne);
route.post('/', Client.add);
route.put('/:id', Client.update);
route.delete('/', Client.delete);

export default route;
