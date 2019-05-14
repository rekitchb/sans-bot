// Rest of plugin here

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  // Rest of code here
};

exports.conf = {
  aliases: [],
  cooldown: '10'
};

exports.help = {
  name: 'nama_command',
  description: 'Deskripsi command.',
  usage: 'file_command penggunaan'
};
