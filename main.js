// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in to ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const { commandName } = interaction;

		switch (commandName) {
			case 'ping': {
				const msg = await interaction.reply({
					embeds: [
						new MessageEmbed()
							.setDescription('Pong! Calculating latency...')
							.setColor('BLURPLE'),
					],
					fetchReply: true,
				});
				await interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setDescription(`Pong! Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms (API: ${client.ws.ping}ms)`)
							.setColor('BLURPLE'),
					],
				});
				break;
			}
			default:
				await interaction.reply({ content: 'That command isn\'t working right now or isn\'t set up yet. Check back later?', ephemeral: true });
		}
	}
	else if (interaction.isButton()) {
		// button stuff here
	}
	else if (interaction.isContextMenu()) {
		// context menu stuff here
	}
});

// Login to Discord with your client's token
client.login(token);