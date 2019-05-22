module.exports = class Constant {
  constructor() {
    /**
     * Template usage of the command
     * @param {string} prefix - Prefix of the bot.
     * @param {string} usage - Usage of the command.
     * @returns {string}
     */
    this.usage = (prefix, usage) => {
      return `penggunaan yang benar untuk command ini adalah:\n**\`\`\`${prefix}${usage}\`\`\`**`;
    }
  }
}