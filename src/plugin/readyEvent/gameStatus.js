const config = require('../../config.json');
const prefix = process.env.DEV ? config.bot_dev_prefix : config.bot_prefix;
const status = require('../json/status.json');
const stringTemplate = require('string-template');

const { Client } = require('../../Bot')
/**
 * @param {Client} client
 */
module.exports = (client) => {
  // Game status
  let gameStatus = `${prefix}help | `;
  // If debug mode
  if (config.is_debug || process.env.DEV) {
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
    status.addition.forEach(text => {
      statuses.push(text);
    })
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