const log = require('./console');
const { ShardingManager } = require('discord.js');
const Config = require('./config.json');
require('dotenv').config();

if (!Config.server_private) {
  const shards = new ShardingManager('./initial', {
    token: process.env.TOKEN,
    totalShards: 'auto'
  });

  shards.on('launch', shards => {
    log.info('Menjalankan bot secara publik!');
    log.info(`(#${shards.id}) Launched Shard!`);
  });

  shards.spawn();
} else {
  log.info('Menjalankan bot secara privat!');
  require('./initial');
}
