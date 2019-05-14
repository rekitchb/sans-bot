const { Client } = require('../Bot');
const log = require('../console');
const fs = require('fs');

/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 */
module.exports = client => {
  log.info('Botmu telah jalan sesuai dengan mestinya.');

  fs.readdir('./src/plugin/readyEvent', (err, files) => {
    if (!err) {
      files.forEach(file => {
        require(`../plugin/readyEvent/${file}`)(client);
      })
    } else {
      return log.error(err.message);
    }
  })
};
