const { Client, Message } = require('../Bot');
const log = require('../console');
const configs = require('../config.json');
const _prefix = process.env.DEV ? configs.bot_dev_prefix : configs.bot_prefix;
const _ownerID = configs.owners_id;
const stringTemplate = require('string-template');

/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 */
module.exports = (client, message) => {
  // Selain bot dan DM_Channel, bot akan mendengarkan commandnya
  if (message.author.bot || !message.guild) return;
  // Apabila debug dan yang mengeksekusi kodenya bukan owner, hiraukan
  if (process.env.DEV && (message.content.startsWith(_prefix) && !_ownerID.includes(message.author.id))) {
    return message.channel.send(
      stringTemplate(
        ':wave: | Hai <@{user}>, bot ini sedang mengalami perbaikan.',
        {
          user: message.author.id
        }
      )
    );
  }

  let prefix = _prefix.toLowerCase();
  let msg = message.content.toLowerCase();

  // Tanya Mention
  if (msg === `<@${client.user.id}>` || msg === `<@!${client.user.id}>`) {
    message.channel.send(
      stringTemplate(
        ':wave: | Hai <@{user}>, prefix bot ini adalah `{prefix}`',
        {
          user: message.author.id,
          prefix: prefix
        }
      )
    );
  }
  // Tanya prefix
  if (msg.startsWith(prefix)) {
    try {
      require('../handler/command')(client, message);
    } catch (e) {
      return log.error(e);
    }
  }
};
