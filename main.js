// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed, VoiceChannel } = require('discord.js');

// Require external files
const { token, staffIds } = require('./config.json');
const emojis = require('./emojis.js');
const embeds = require('./embeds.js');
const components = require('./components.js');

// Require dependencies
const fetch = require('node-fetch');
const Sequelize = require('sequelize');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const Users = sequelize.define('users', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
	},
	wallet: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	bank: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	jobPoints: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});
const Job = sequelize.define('job', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	requiredJobPoints: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	baseSalary: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});
Users.belongsTo(Job);
Job.hasMany(Users);

// When the client is ready, run this code (only once)
client.once('ready', () => {
	Users.sync();
	Job.sync();
	console.log(`Logged in to ${client.user.tag}!`);
});

function badges(user, names) {
	const badgeList = [];
	const staffEntry = staffIds.find(staff => staff.id === user.id);
	if (staffEntry) {
		if (staffEntry.staff) {badgeList.push(`<:staff:${emojis.STAFF}>${names ? ' **Staff**' : ''}`);}
		if (staffEntry.verified) {badgeList.push(`<:verified:${emojis.VERIFIED}>${names ? ' **Verified**' : ''}`);}
		if (staffEntry.tester) {badgeList.push(`<:tester:${emojis.TESTER}>${names ? ' **Tester**' : ''}`);}
	}
	return badgeList;
}

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
				if (!(interaction.options.getChannel('channel') instanceof VoiceChannel)) {
					await interaction.reply({ content: 'That isn\'t a voice channel.', ephemeral: true });
					break;
				}
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
				});
				break;
			}
			case 'menu': {
				const user = await Users.findOne({ where: { id: interaction.user.id } });
				if (user) {
					await interaction.reply({
						embeds: embeds.MENU,
						components: components.MENU,
						ephemeral: true,
					});
					break;
				}
				await interaction.reply({
					embeds: embeds.REGISTER,
					components: components.REGISTER,
					ephemeral: true,
				});
				break;
			}
			default:
				await interaction.reply({ content: 'That command isn\'t working right now or isn\'t set up yet. Check back later?', ephemeral: true });
		}
	}
	else if (interaction.isButton()) {
		const { customId } = interaction;

		switch (customId) {
			case 'register_create': {
				try {
					await Users.create({ id: interaction.user.id });
					await interaction.update({ embeds: embeds.REGISTER_SUCCESS, components: [] });
				}
				catch (err) {
					console.log(err);
					await interaction.update({ embeds: embeds.REGISTER_FAILURE, components: [] });
				}
				break;
			}
			case 'menu_back': {
				await interaction.update({ embeds: embeds.MENU, components: components.MENU });
				break;
			}
			case 'menu_job_listings': {
				// const user = await Users.findOne({ where: { id: interaction.user.id } });
				break;
			}
			case 'menu_profile_delete': {
				await interaction.update({ embeds: embeds.MENU_PROFILE_DELETE, components: components.MENU_PROFILE_DELETE });
				break;
			}
			case 'profile_delete': {
				await Users.destroy({ where: { id: interaction.user.id } });
				await interaction.update({ embeds: embeds.PROFILE_DELETED, components: [] });
				break;
			}
		}
	}
	else if (interaction.isSelectMenu()) {
		const { customId } = interaction;

		switch (customId) {
			case 'menu_category': {
				const { user } = interaction;

				switch (interaction.values[0]) {
					case 'profile': {
						const fields = [];
						if (badges(user).length > 0) {
							fields.push({
								name: 'Badges',
								value: `${badges(user).length > 0 ? `${badges(user, true).join('\n')}` : ''}`,
							});
						}
						await interaction.update({
							embeds: [
								new MessageEmbed()
									.setTitle('Profile')
									.setDescription(`
										**${user.tag}**${badges(user).length > 0 ? ` ${badges(user).join('')}` : ''}
									`)
									.setFields(fields)
									.setThumbnail(user.avatarURL({ dynamic: true }))
									.setColor('BLURPLE'),
							],
							components: components.MENU_PROFILE,
						});
						break;
					}
					case 'job': {
						const dbUser = await Users.findOne({ where: { id: interaction.user.id }, include: Job });
						if (!dbUser) {
							await interaction.update({ embeds: embeds.REGISTER, components: components.REGISTER });
							break;
						}
						if (!dbUser.jobId) {
							await interaction.update({
								embeds: [
									new MessageEmbed()
										.setTitle('Job')
										.setDescription('You are currently unemployed.')
										.setColor('BLURPLE'),
								],
								components: components.MENU_JOB_NOJOB,
							});
							break;
						}
						await interaction.update({
							embeds: [
								new MessageEmbed()
									.setTitle('Job')
									.setDescription(`You are currently employed with **${dbUser.job.name}**.`)
									.setFields([
										{
											name: 'Salary',
											value: `$${dbUser.job.baseSalary}`,
										},
									])
									.setColor('BLURPLE'),
							],
							components: components.MENU_JOB_WITHJOB,
						});
						break;
					}
					case 'bank': {
						const dbUser = await Users.findOne({ where: { id: interaction.user.id } });
						if (!dbUser) {
							await interaction.update({ embeds: embeds.REGISTER, components: components.REGISTER });
							break;
						}
						await interaction.update({
							embeds: [
								new MessageEmbed()
									.setTitle('Bank')
									.setDescription('Use the /deposit and /withdraw commands to transfer funds between your Wallet and Bank.')
									.setFields([
										{
											name: 'Wallet',
											value: `$${dbUser.wallet}`,
											inline: true,
										},
										{
											name: 'Bank',
											value: `$${dbUser.bank}`,
											inline: true,
										},
									])
									.setColor('BLURPLE'),
							],
							components: components.MENU_BANK,
						});
						break;
					}
				}
				break;
			}
		}
	}
});

// Login to Discord with your client's token
client.login(token);