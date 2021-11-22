const fs = require('fs');
const Discord = require('discord.js');
const { Player } = require('discord-player');
const Client = require('./client/Client');

// an inherited class has been created from the parent 'Client' class
const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

// TODO some changes
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application.owner) await client.application.fetch();

  if (
    message.content === '!deploy' &&
    message.author.id === client.application.owner.id
  ) {
    await message.guild.commands
      .set(client.commands)
      .then(() => {
        message.reply('Deployed!');
      })
      .catch((err) => {
        message.reply(
          'Could not deploy commands! Make sure the bot has the application.commands permission!'
        );
        console.error(err);
      });
  }
});

// TODO some changes
client.on('interactionCreate', async (interaction) => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    command.execute(interaction, player);
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'There was an error trying to execute that command!',
    });
  }
});

client.login(process.env.CLIENT_TOKEN);
