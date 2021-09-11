// To be run once.
// Set global to true in config.json to deploy commands globally.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, global } = require('./config.json');

const commands = [
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check the bot\'s latency.'),
	new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Start a Discord activity.')
		.addStringOption(option =>
			option
				.setName('activity')
				.setDescription('The activity to start.')
				.setRequired(true)
				.addChoice('YouTube Together', '755600276941176913')
				.addChoice('Discord Poker Night', '755827207812677713')
				.addChoice('Chess in the Park', '832012774040141894')
				.addChoice('Betrayal.io', '773336526917861400')
				.addChoice('Fishington.io', '814288819477020702'))
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The voice channel to start the activity in.')
				.setRequired(true)),
	new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Display the interaction menu.')
		.addStringOption(option =>
			option
				.setName('category')
				.setDescription('The category of the interaction menu to display.')
				.addChoice('Profile', 'profile')
				.addChoice('Job', 'job')
				.addChoice('Bank', 'bank')),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			global ? Routes.applicationCommands(clientId) : Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();