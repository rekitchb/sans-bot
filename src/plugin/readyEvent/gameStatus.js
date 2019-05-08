const config = require('../../config.json');
const status = require('../json/status.json');
const stringTemplate = require('string-template');

const { Client } = require('../../Bot')
/**
 * @param {Client} client
 */
module.exports = (client) => {
  // Game status
  let gameStatus = `${config.bot_prefix}help | `;
  // If debug mode
  if (config.is_debug) {
    client.user.setPresence({
      game: {
        name: gameStatus + 'DEBUG MODE'
      }
    });
  }
  // Normal mode
  else {
    let statuses = [];
    statuses.push(stringTemplate(status.user, client.users.size));
    if (config.server_private) {
      statuses.push(stringTemplate(status.channel, client.channels.size));
      statuses.push(stringTemplate(status.server, client.guilds.size));
    }
    // Push random status
    statuses.push(status.addition);
    function randomGame() {
      let leng = statuses.length;
      let randNumber = Math.floor(Math.random() * leng);
      client.user.setPresence({
        game: {
          name: gameStatus + statuses[randNumber]
        }
      });
    }
    setInterval(() => {
      randomGame();
    }, 5000);
  }
}