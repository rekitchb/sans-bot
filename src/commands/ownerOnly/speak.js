const config = require('../../config.json');

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
  let text = args.splice(1).join(' ');

  let channel =
    channelID === 'this' ? message.channel : client.channels.get(channelID);

  channel
    .send(text)
    .then(res => {
      if (channelID !== 'this') {
        message.channel.send(`Your message was send in <#${channelID}>`);
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
  name: 'speak',
  description: 'Speak with the bot.',
  usage: 'speak <channelID|this> <text>'
};
