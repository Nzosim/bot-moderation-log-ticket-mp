const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('mute une personne pendant un temp defini')
        .addUserOption(option => option.setName('user').setDescription('personne à mute').setRequired(true))
        .addStringOption(option => option.setName('temps').setDescription('temps du mute').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('raison du mute').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
    const temps = parseDuration(interaction.options.getString('temps'))
    const raison = interaction.options.getString('raison')
        
    if (user == interaction.user.id) {
      return interaction.reply({ content: `Vous ne pouvez pas vous mute vous même`, ephemeral: true })
    }
    if (user == interaction.guild.ownerId) {
      return interaction.reply({ content: `Vous ne pouvez pas mute le fondateur du serveur`, ephemeral: true })
    }

    if(temps > 2419200000) return interaction.reply("Le temps doit être inférieur à 28 jours")

    if(interaction.guild.members.cache.get(user.id).isCommunicationDisabled()) return interaction.reply("Cette personne est déjà muette !")
    await interaction.guild.members.cache.get(user.id).timeout(temps, raison)


    let embed = new MessageEmbed()
      .setTitle(`[MUTE] ${user.tag}`)
      .setColor(config.embedColor)
      .addField('Modérateur', interaction.user.username, true)
      .addField('Raison', raison, true)
      .addField('Durée', humanizeDuration(temps, {language: 'fr'}), true)
      .setThumbnail(user.displayAvatarURL());

    return interaction.reply({ embeds: [embed]});
  },
}