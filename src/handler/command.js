const { bot_prefix } = require('../config.json');
const { Collection } = require('discord.js');
const cooldowns = new Collection();
const stringTemplate = require('string-template');
const log = require('../console');

const { Client, Message } = require('../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 */
module.exports = (client, message) => {
  let prefix = bot_prefix;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  // BEGIN COOLDOWN //
  // Cari command
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;
  if (!cooldowns.has(commandFile.help.name)) {
    cooldowns.set(commandFile.help.name, new Collection());
  }

  // Register member dengan tanggal terakhir penggunaan command
  const member = message.member;
  const now = Date.now();
  const timestamps = cooldowns.get(commandFile.help.name);
  const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;

  if (!timestamps.has(member.id)) {
    timestamps.set(member.id, now);
  } else {
    const expirationTime = timestamps.get(member.id + cooldownAmount);
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      // Pesannya, ganti sesuai keinginan
      return message.channel
        .send(
          stringTemplate(
            '**<@{user}>**, mohon tunggu untuk menggunakan command ini sekitar {count} detik.',
            {
              user: member.id,
              count: timeLeft.toFixed(1)
            }
          )
        )
        .then(msg => msg.delete());
    }
  }
  //  END COOLDOWN  //

  // START HANDLER //
  // Test Command
  try {
    let commands =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    commands.run(client, message, args);
    if (!commands) return;
  } catch (e) {
    // Apabila ada error
    log.error(e);
  } finally {
    // Apabila sukses
    log.info(
      stringTemplate(
        '{tag}[{id}] menggunakan perintah {command}!\nGuild:\t{guildName} | {guildLocation}\nGuild_ID:\t{guildID}',
        {
          tag: message.author.tag,
          id: message.author.id,
          command: message.content.split(' ')[0].replace(prefix, ''),
          guildName: message.guild.name,
          guildLocation: message.guild.region,
          guildID: message.guild.id
        }
      )
    );
  }
  //  END HANDLER  //
};
