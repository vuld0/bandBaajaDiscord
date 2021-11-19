// const validUrl = require('valid-url');
// const ytdl = require('ytdl-core');
const { Player } = require('discord-player');

// TODO add else if.

const play = (bot, message, url) => {
  // Create a new player
  const player = new Player(bot);

  // player.on('trackStart', (queue, track) =>
  //   queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
  // );

  // const query = url;
  const queue = player.createQueue(message.guild, {
    metadata: {
      channel: message.reply('Could not join the voice channel!'),
    },
  });

  // verify vc connection
  try {
    if (!queue.connection) queue.connect(message.member.voice.channel);
  } catch {
    queue.destroy();
    message.reply('Could not join the channel');
  }
};
module.exports = {
  play,
};
