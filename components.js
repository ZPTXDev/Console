const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
	REGISTER: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('register_create')
					.setLabel('Create')
					.setStyle('SUCCESS'),
			),
	],
	REGISTER_SUCCESS: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Continue')
					.setStyle('PRIMARY'),
			),
	],
	MENU: [
		new MessageActionRow()
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
	],
	MENU_BANK: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
	MENU_PROFILE: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_profile_delete')
					.setLabel('Delete')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
	MENU_PROFILE_DELETE: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('profile_delete')
					.setLabel('Delete all data')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
	MENU_JOB_NOJOB: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_job_listings')
					.setLabel('Job Listings')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
	MENU_JOB_WITHJOB: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_job_resign')
					.setLabel('Resign')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
	MENU_JOB_LISTINGS: [
		new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menu_back')
					.setLabel('Back')
					.setStyle('SECONDARY'),
			),
	],
};