const axios = require('axios').default;

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  setInterval(() => {
    client.timer.start;
    axios('https://sansbot-database.glitch.me/')
      .then(res => {
        client.timer.stop();
        let interval = client.timer.count;
        // If got the hand shake to the server
        if (res.status === 200) {
          client.log.info(`[HANDSHAKE] Handshake received! (${interval}ms)`);
        }
      })
      .catch(err => {
        client.timer.stop();
        let interval = client.timer.count;
        client.log.error(`[HANDSHAKE] Handshake Error! (${interval}ms)\n\t${err.message}`);
      })
    client.timer.reset();
  }, 10000);
}