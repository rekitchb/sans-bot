const axios = require('axios').default;

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  setInterval(() => {
    let interval = 0;
    function timer() {
      interval++;
    }
    setInterval(timer(), 1);
    axios('https://sansbot-database.glitch.me/')
      .then(res => {
        clearInterval(timer());
        // If got the hand shake to the server
        if (res.status === 200) {
          client.log.info(`[HANDSHAKE] Handshake received! (${interval}ms)`);
        }
      })
      .catch(err => {
        clearInterval(timer());
        client.log.error(`[HANDSHAKE] Handshake Error! (${interval}ms)\n\t${err.message}`);
      })
  }, 30000);
}