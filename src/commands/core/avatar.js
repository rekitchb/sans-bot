const { User, RichEmbed, GuildMember } = require('discord.js');

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  let guild = message.guild;
  let author = message.author;
  let embed = new RichEmbed();
  let user;

  // Random string avoider
  try {
    user = message.mentions.users.first() || guild.member(args[0]).user;
  }
  catch (ex) {
    return message.reply(client.constant.usage(
      client.prefix,
      client.commands.get(this.help.name).help.usage
    ));
  }

  // Divider avatar
  if (!user) {
    embed
      .setDescription('Your avatar here.')
      .setImage(author.avatarURL);
  }
  else {
    embed
      .setDescription(`${user.username}#${user.discriminator} avatar here.`)
      .setImage(user.avatarURL);
  }

  embed
    .setColor(client.color)
    .setFooter(`Requested by ${author.username}#${author.discriminator}`, author.avatarURL)
    .setTimestamp();

  message.channel.send({ embed });
};

exports.conf = {
  aliases: [],
  cooldown: '10'
};

exports.help = {
  name: 'avatar',
  description: 'Tampilkan avatar Discord.',
  usage: 'avatar [id|mention]'
};
