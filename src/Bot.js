const { Client, Collection, Message } = require('discord.js');
const { embed_color, bot_prefix } = require('./config.json');
const log = require('./console');
const Constant = require('./handler/constant');

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

    this.color = embed_color;
    this.log = log;
    this.prefix = bot_prefix;
    this.constant = new Constant();
  }
}

// Export here
module.exports = {
  Client: DiscordClient,
  Message: Message
}
