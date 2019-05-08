const { Client, Collection, Message } = require('discord.js');
const Timer = require('./plugin/timer');
const { embed_color } = require('./config.json');

/**
 * Extender Client for Tempeh.
 * JANGAN DIGANGGU KECUALI ADA UPDATE BARU.
 */
class DiscordClient extends Client {
  constructor(opt) {
    super(opt);

    this.queue = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.helps = new Collection();

    this.timer = new Timer();
    this.color = embed_color;
  }
}

// Export here
module.exports = {
  Client: DiscordClient,
  Message: Message
}
