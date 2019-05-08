const config = require('../../config.json');
const { RichEmbed } = require('discord.js');

const { Client, Message } = require('../../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {Message} message - Ambil informasi dari dimensi message/pesan
 * @param {string[]} args - Ambil informasi sesuai apa yang diinput oleh user
 */
exports.run = async (client, message, args) => {
  // ONLY OWNER CAN DO THIS MOTHERFUCKER
  if (!config.owners_id.includes(message.author.id)) return;

  let script = args.join(' ');
  let msgID = message.id;

  // Detect the blockquote
  if (!script.startsWith('```js') && !script.endsWith('```')) {
    await message.channel.messages.get(msgID).react('❌');
    await message.channel.send('Maybe you forgot the blockcode?');
  } else {
    let newScript = script
      .match(/[^```]/gm)
      .join('')
      .split('\n')
      .splice(1)
      .join('');
    let _eval_ = eval(newScript);

    if (typeof _eval_ !== 'string')
      _eval_ = require('util').inspect(_eval_, { depth: 0 });

    let embed = new RichEmbed()
      .setColor(client.color)
      .addField('Output', `\`\`\`js\n${_eval_}\`\`\``);

    message.channel.send('Testing some code.', { embed });
  }
};

exports.conf = {
  aliases: ['e'],
  cooldown: '1'
};

exports.help = {
  name: 'eval',
  description: 'Evaluate the code.',
  usage: 'eval <script>'
};
