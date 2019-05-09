/**
 * Tempeh-Rework (Source: https://github.com/discordbotsNation/Rendang)
 * DiscordBot Nation. All Right reserved.
 * Ikramullah Latif / github/skymunn
 */

const log = require('./src/console');

if (process.argv[2] === 'dev') {
  log.info('DEVELOPMENT MODE!');
  process.env.DEV = true
  require('./src/main');
}
else {
  require('./src/main');
}
