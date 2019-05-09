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
  setInterval(() => {
    let timer = new TimerMachine();
    timer.start();
    axios(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
      .then(res => {
        if (res.status === 200) {
          client.log.info(`[PING] Ping received! (${timer.time()} ms)`);
        }
      })
      .catch(err => {
        client.log.info(`[PING] Ping not received! (${timer.time()} ms)\n\t${err.message}`);
      })
    timer.stop();
  }, 60000);
}