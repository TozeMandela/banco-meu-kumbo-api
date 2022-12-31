import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { resolve } from 'path';

import index from './routes/index';
import user from './routes/usersR';
import cliente from './routes/cliente';
import conta from './routes/conta';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, 'backend', 'uploads')));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', index);
    this.app.use('/user/', user);
    this.app.use('/cliente/', cliente);
    this.app.use('/conta/', conta);
  }
}

export default new App();
