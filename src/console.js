const config = require('./config.json');
const chalk = require('chalk');

const _log = {
  getTime: () => `[${new Date().toISOString()}]`,
  pid: process.pid,
  /**
   * @param {string} name
   * @param {string} value
   * @param {string} level
   */
  executor: (value, name, level) => {
    // let stringret = `${_log.getTime} ${name}/${pid} ${info}: `;
    let entry = value.split('\n');
    let finVal = '';

    if (entry.length > 1) {
      entry.forEach(text => {
        finVal += `\n${' '.repeat(4)}${text}`;
      })
    }
    else {
      finVal += value;
    }

    console.log(`${chalk.default.red(_log.getTime())} ${name}/${_log.pid} ${level}: ${chalk.default.cyan(finVal)}`)
  }
}

const log = {
  name: config.bot_name,
  /**
   * @param {string} value
   */
  info: (value) => _log.executor(value, log.name, chalk.default.blue(' INFO')),
  /**
   * @param {string} value
   */
  error: (value) => _log.executor(value, log.name, chalk.default.redBright('ERROR')),
  /**
   * @param {string} value
   */
  fatal: (value) => _log.executor(value, log.name, chalk.default.bgRedBright('FATAL'))
}
module.exports = log;
