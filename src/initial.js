const { Client } = require('./Bot');
const _Client = new Client({
  fetchAllMembers: true,
  disabledEvents: ['USER_NOTE_UPDATE']
});

require('./handler/events')(_Client);
require('./handler/module')(_Client);

_Client.login(process.env.DEV ? process.env.TOKEN_DEV : process.env.TOKEN);
