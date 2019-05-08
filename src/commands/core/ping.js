const { RichEmbed } = require('discord.js');

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  let counting = Date.now();
  message.channel
    .send(':ping_pong: | **Wait for some reason...**')
    .then(msg => {
      let diff = (Date.now() - counting).toLocaleString();
      let api = client.ping.toFixed(0);
      let embed = new RichEmbed()
        .setColor(client.color)
        .setTitle(':ping_pong: Pong!')
        .addField('Latency', `${diff}ms`, true)
        .addField('API', `${api}ms`, true);
      msg.delete();
      message.channel.send(embed);
    });
};

exports.conf = {
  aliases: ['pang', 'peng', 'pong'],
  cooldown: '5'
};

exports.help = {
  name: 'ping',
  description: 'P P P P.',
  usage: 'ping'
};
