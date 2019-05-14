const { GuildMember } = require('discord.js');
const _axios = require('axios');
const elm_settings = require('../plugin/json/elm_settings.json');
const log = require('../console');
const stringTemplate = require('string-template');

const { Client } = require('../Bot');
/**
 * @param {Client} client - Ambil informasi dari dimensi client/bot
 * @param {GuildMember} member - Ambil informasi dari member yang keluar
 */
module.exports = (client, member) => {
  // When leave in POS
  if (member.guild.id === elm_settings['serverID']) {
    if (process.env.DEV) return;
    let dataMember = {
      memberID: member.id,
      serverID: member.guild.id,
      roles: member.roles.map(role => role.id)
    }
    if (dataMember.roles.includes(elm_settings['elmID'])) {
      let axios = _axios.default;
      axios({
        method: 'post',
        url: 'https://sansbot-database.glitch.me/user_leave/set/',
        params: {
          password: process.env.SUPERADMIN,
          serverID: dataMember.serverID,
          memberID: dataMember.memberID,
          roles: JSON.stringify(dataMember.roles)
        }
      })
        .then(res => {
          let result = res.data;
          log.info(
            stringTemplate('Sepertinya ada tersangka ingin melarikan diri!\nevents_Started:\t{event_url}\nuser_runnaway:\t{user_name}#{user_disc}<{user_id}>',
              {
                event_url: result.event,
                user_name: member.user.username,
                user_disc: member.user.discriminator,
                user_id: member.id
              }
            )
          )
          client.guilds.get('336336077755252738')
            .channels.get('336877836680036352')
            .send(`EVADING: ${member.user.username}#${member.user.discriminator}<${member.id}> evading the ELM!`);
        })
        .catch(err => {
          return log.error(err.message);
        })
    }
  }
}
