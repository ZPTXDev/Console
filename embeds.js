const { MessageEmbed } = require('discord.js');

module.exports = {
	REGISTER: [
		new MessageEmbed()
			.setTitle('Registration')
			.setDescription('You do not have a profile.\nUse the button below to create one.')
			.setColor('BLURPLE'),
	],
	REGISTER_SUCCESS: [
		new MessageEmbed()
			.setTitle('Registration')
			.setDescription('Success! You can now use all core features.')
			.setColor('BLURPLE'),
	],
	REGISTER_FAILURE: [
		new MessageEmbed()
			.setTitle('Registration')
			.setDescription('Unfortunately, an error occurred during your registration process.\nYou can try again, or inform a developer.')
			.setColor('BLURPLE'),
	],
	MENU: [
		new MessageEmbed()
			.setTitle('Interaction Menu')
			.setDescription('Choose an option below to continue.')
			.setColor('BLURPLE'),
	],
	MENU_PROFILE_DELETE: [
		new MessageEmbed()
			.setTitle('Delete Profile')
			.setDescription('Are you sure?\nThis action is irreversible and all data you have will be lost.\nUse the button below to proceed.')
			.setColor('BLURPLE'),
	],
	PROFILE_DELETED: [
		new MessageEmbed()
			.setTitle('Delete Profile')
			.setDescription('All of your data has been deleted.')
			.setColor('BLURPLE'),
	],
};