const express = require('express');
const axios = require('axios').default;
const app = express();
const TimerMachine = require('timer-machine');

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  if (process.env.DEV) return;

  app.get('/', (request, response) => {
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
}
