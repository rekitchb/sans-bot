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

    let axios = _axios.default;
    axios({
      method: 'post',
      url: 'https://sansbot-database.glitch.me/user_leave/get/',
      params: {
        password: process.env.SUPERADMIN,
        serverID: member.guild.id,
        memberID: member.id,
        check: true
      }
    })
      .then(res => {
        let resultFinder = res.data.result;
        if (resultFinder) {
          // Dapatkan rolenya kembali
          axios(
            {
              method: 'post',
              url: 'https://sansbot-database.glitch.me/user_leave/get/',
              params: {
                password: process.env.SUPERADMIN,
                serverID: member.guild.id,
                memberID: member.id,
              }
            }
          )
            .then(res2 => {
              let listRole = res2.data.data.roles.slice(1);
              listRole.forEach(role => {
                member.addRole(role);
              })
              log.info(`EVADING: [${member.user.username}] Successfully Arrested!`);
            })

          // Hapus riwayatnya
          axios({
            method: 'post',
            url: 'https://sansbot-database.glitch.me/user_leave/set/',
            params: {
              password: process.env.SUPERADMIN,
              serverID: member.guild.id,
              memberID: member.id,
              delete: true
            }
          })
            .then(res2 => {
              if (res2.data.deleted) {
                log.info(`EVADING: [${member.user.username}] Record is deleted!`)
              }
            })
        }
      })
      .catch(err => {
        return log.error(err.message);
      })
  }
}
