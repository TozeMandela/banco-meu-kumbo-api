import express from 'express';

const route = express.Router();

route.get('/', (req, res) => {
  res.send('Welcome in My Kumbu Bank');
});

export default route;
