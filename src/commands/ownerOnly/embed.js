const config = require('../../config.json');
const { RichEmbed } = require('discord.js');
const date = new Date();
const stringTemplate = require('string-template');

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  // ONLY OWNER CAN DO THIS MOTHERFUCKER
  if (!config.owners_id.includes(message.author.id)) return;

  let channelID = args[0];
  let script = JSON.parse(args.splice(1).join(' '));
  // console.log(channelID);
  // console.log(script);

  let channel = channelID === 'this' ? message.channel : client.channels.get(channelID);
  let embed = new RichEmbed(script).setTimestamp().setFooter(
    stringTemplate('(C) {year} - {projName}. All Right Reserved.', {
      year: date.getFullYear(),
      projName: config['bot_name']
    }),
    client.user.avatarURL
  );

  channel
    .send({ embed })
    .then(res => {
      if (channelID !== 'this') {
        try {
          message.channel.send(`Your embed message was send in <#${channelID}>`);
        } catch (e) {
          message.reply(e.message)
        }
      }
    })
    .catch(e => {
      message.channel.send(e.message);
    });
};

exports.conf = {
  aliases: [],
  cooldown: '1'
};

exports.help = {
  name: 'embed',
  description: 'Make embed messages.',
  usage: 'embed <channelID|this> {JSON}'
};
