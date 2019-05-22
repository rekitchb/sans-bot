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
  let user = message.mentions.members.first();

  if (!user) {
    if (!args[0]) {
      embed
        .setDescription('Your avatar here.')
        .setImage(author.avatarURL);
    }
    else {
      let member = guild.members.get(args[0]);
      if (!member) {
        return message.reply(
          client.constant.usage(
            client.prefix, client.commands.get(this.help.name).help.usage
          )
        )
      }
      else {
        embed
          .setDescription(`${member.user.username}#${member.user.discriminator} avatar.`)
          .setImage(member.user.avatarURL);
      }
    }
  }
  else {
    embed
      .setDescription(`${user.user.username}#${user.user.discriminator} avatar here.`)
      .setImage(user.user.avatarURL);
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
