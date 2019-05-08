const { Client } = require('../Bot');
const log = require('../console');
const fs = require('fs');

/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 */
module.exports = client => {
  // Cari category commands
  fs.readdir('./src/commands', (err, categories) => {
    if (err) return log.error(err);
    log.info(`Menemukan ${categories.length} kategori di sesi ini.`);
    // console.log(categories);
    categories.forEach(category => {
      // Ambil data module
      let moduleConf = require(`../commands/${category}/module.json`);
      moduleConf.path = `./commands/${category}`;
      moduleConf.cmds = [];
      client.helps.set(category, moduleConf);
      if (!moduleConf) return;
      // console.log(client.helps);
      fs.readdir(`./src/commands/${category}`, (err, files) => {
        log.info(
          `Menemukan total ${files.length - 1} perintah dari [${category}].`
        );
        if (err) return log.error(err);
        // console.log(files);
        files.forEach(file => {
          if (!file.endsWith('.js')) return;
          let cmdName = file.split('.')[0];
          let prop = require(`../commands/${category}/${file}`);
          client.commands.set(prop.help.name, prop);
          prop.conf.aliases.forEach(alias => {
            client.aliases.set(alias, prop.help.name);
          });
          client.helps.get(category).cmds.push(prop.help.name);
          // console.log(client.commands);
        });
      });
    });
  });
};
