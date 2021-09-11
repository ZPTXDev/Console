// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed, VoiceChannel } = require('discord.js');
const { token } = require('./config.json');
const fetch = require('node-fetch');

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
			case 'activity': {
				if (interaction.options.getChannel('channel') instanceof VoiceChannel) {
					const channel = interaction.options.getChannel('channel');
					const result = await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
						method: 'POST',
						body: JSON.stringify({
							max_age: 0,
							max_uses: 0,
							target_application_id: interaction.options.getString('activity'),
							target_type: 2,
							temporary: false,
							validate: null,
						}),
						headers: {
							'Authorization': `Bot ${token}`,
							'Content-Type': 'application/json',
						},
					});
					const invite = await result.json();
					await interaction.reply({
						embeds: [
							new MessageEmbed()
								.setDescription(`Your invite link is https://discord.com/invite/${invite.code}`)
								.setColor('BLURPLE'),
						],
						fetchReply: true,
					});
				}
				else {
					await interaction.reply({ content: 'That isn\'t a voice channel.', ephemeral: true });
				}
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