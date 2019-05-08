const { Client } = require('../Bot');
const { readdirSync } = require('fs');

/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 */
module.exports = client => {
  const events = readdirSync('./src/events').map(e => e.split('.')[0]);
  events.forEach(event => {
    let file = require(`../events/${event}`);
    client.on(event, (...args) => file(client, ...args));
  });
};
