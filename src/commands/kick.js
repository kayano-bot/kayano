const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageAttachment } = require('discord.js');
const { noPermissionText, defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason you kick the member')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return interaction.reply({ content: noPermissionText, ephemeral: true });
		}
		else {
			const target = interaction.options.getMember('target');
			const reason = interaction.options.getString('reason');
			const image = new MessageAttachment('./assets/ban.png', 'ban.png');

			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setThumbnail('attachment://ban.png')
				.setTitle(`Successfully banned ${target.tag} (${target.id})`)
				.setDescription('I successfully banned **${target.username}** for you.')
				.addField('Reason:', ((reason) ? reason : 'None'));

			target.kick(reason);
			return interaction.reply({ embeds: [embed], files: [image], ephemeral: true });
		}
	},
};
