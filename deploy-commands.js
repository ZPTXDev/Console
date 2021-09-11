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