/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import bcrypt from 'bcryptjs';

export default function cleanData(body, Erros) {
  for (const key in body) {
    body[key] = body[key].trim();

    if (body[key] === null || body[key] === undefined) body[key] = '';

    if (key === 'bi' && body[key] !== '') {
      body[key] = body[key].toUpperCase();

      if (!isNaN(Number(body[key][10]))
      || !isNaN(Number(body[key][9]))
      || body[key].length !== 14) Erros.push('verifique se o número de BI está correcto!');
    }

    if (key === 'password') {
      body[key] = bcrypt.hashSync(body[key], 8);
    }
  }

  return body;
}
