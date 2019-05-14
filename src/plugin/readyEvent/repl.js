const repl = require('repl');

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  var myRepl = repl.start({
    prompt: ''
  });

  myRepl.context.client = client;
  // myRepl.context.exitBot = process.exit(0);
}