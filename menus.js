const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
	MENU: new MessageEmbed()
		.setTitle('Interaction Menu')
		.setDescription('Choose an option below to continue.')
		.setColor('BLURPLE'),
	MENU_CATEGORY: new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('menu_category')
				.setPlaceholder('Pick a category')
				.addOptions([
					{
						label: 'Profile',
						description: 'View your profile',
						value: 'profile',
					},
					{
						label: 'Job',
						description: 'View your job details',
						value: 'job',
					},
					{
						label: 'Bank',
						description: 'View your bank details',
						value: 'bank',
					},
				]),
		),
	MENU_BACK: new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('menu_back')
				.setLabel('Back')
				.setStyle('PRIMARY'),
		),
};