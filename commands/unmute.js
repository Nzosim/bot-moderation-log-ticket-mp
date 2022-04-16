const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('unmute une personne')
        .addUserOption(option => option.setName('user').setDescription('personne à unmute').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
        
    if(!interaction.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply("Cette personne n'est pas mute")

    await interaction.guild.members.cache.get(user.id).timeout(null)

    return interaction.reply({ content: `${user} a été unmute.`})
  },
}