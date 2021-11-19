const playCommand = require('../commands/play');

const prefix = '!';
module.exports = (bot) => {
  bot.on('messageCreate', (msg) => {
    // getting the command
    const args = msg.content.substring(prefix.length).split(' ');
    const command = args[0];

    switch (command) {
      case 'check': {
        // return the gaali
        msg.reply('check check!');
        return;
      }
      // if the user wants to play something
      case 'play': {
        if (!args[1]) {
          msg.channel.send('add the link bro!');
        }
        playCommand.play(bot, msg, args[1]);
        return;
      }
      default:
        msg.reply('Command not recognized!');
    }
  });
};
