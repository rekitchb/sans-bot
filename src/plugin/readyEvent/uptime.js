const express = require('express');
const app = express();
const log = require('../../console');

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  if (process.env.DEV) return;

  app.get('/', (request, response) => {
    let IP = request.ip;
    log.info(`[PINGED] Got ping from ${IP}!`);

    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
}
