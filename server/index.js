require('dotenv').config();
const { Client, Intents } = require('discord.js');

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

require('./controller/botController')(bot);

bot.on('ready', () => {
  console.log(`Bot ${bot.user.tag} has logged in!`);
});
// prefix for our bot command

// Checking if the user has connected to a voice channel
// const voiceChannel = message

bot.login(process.env.CLIENT_TOKEN); // login to bot using token
