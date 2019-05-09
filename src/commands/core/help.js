const { RichEmbed } = require('discord.js');
const stringTemplate = require('string-template');
const config = require('../../config.json');

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  const embed = new RichEmbed();
  const command = args[0];
  const date = new Date();
  const prefix = process.env.DEV ? config.bot_dev_prefix : config.bot_prefix;
  let send = false;

  // Help without command
  if (!command) {
    // Basa basi
    embed.setTitle('SansBot Command List');
    embed.setDescription(
      stringTemplate(
        'Untuk memeriksa penggunaan command pada bot ini, silahkan ketik di kolom chat: \n```{prefix}help <command>```\n' +
        'Perlu diketahui, untuk pemberian argumen:\n' +
        '`{prefix}com [args]` **>>** Argumen command tidak wajib ditulis.\n' +
        '`{prefix}com <args>` **>>** Argumen command wajib ditulis.\n' +
        '`{prefix}com [menu|m]` **>>** Anda dapat memilih argumen diantara tanda kurung siku tersebut.',
        {
          prefix: prefix
        }
      )
    )
    // Real execution
    client.helps.forEach(help => {
      if (!help.hide) {
        embed.addField(help.name, `\`${help.cmds.join(' ')}\``)
      }
    })

    send = true;
  }
  // Help with command
  else {
    let commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (commandFile) {
      let helper = commandFile.help;
      let aliases = commandFile.conf.aliases;
      let aliasString = aliases.length === 0 ? 'Tidak memiliki alias.' : `Alias: ${aliases.join(', ')}`
      embed
        .setTitle(aliasString)
        .addField('Deskripsi', helper.description)
        .addField('Penggunaan', `\`\`\`${prefix}${helper.usage}\`\`\``)
      send = true;
    } else {
      message.reply(`sepertinya command \`${command}\` tidak ditemukan.`);
      send = false;
    }
  }

  embed
    .setTimestamp()
    .setFooter(
      stringTemplate('(C) {year} - {projName}. All Right Reserved. With {comSize} commands.', {
        year: date.getFullYear(),
        projName: config['bot_name'],
        comSize: client.commands.size
      })
    )
    .setColor(config['embed_color'])
    .setThumbnail(client.user.avatarURL);
  if (send) message.channel.send({ embed });
};

exports.conf = {
  aliases: ['?'],
  cooldown: '10'
};

exports.help = {
  name: 'help',
  description: 'Gatau commandnya? Hayuk liat daftarnya dimari.',
  usage: 'help [command]'
};
