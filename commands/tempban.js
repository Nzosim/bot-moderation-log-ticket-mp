const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempban')
    .setDescription('Ban une personne durant un temps défini')
        .addUserOption(option => option.setName('user').setDescription('personne à bannir').setRequired(true))
        .addStringOption(option => option.setName('temps').setDescription('temps du bannissement').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('raison du bannissement').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
    const temps = parseDuration(interaction.options.getString('temps'))
    const raison = interaction.options.getString('raison')
        
    if (user == interaction.user.id) {
      return interaction.reply({ content: `Vous ne pouvez pas vous ban vous même`, ephemeral: true })
    }
    if (user == interaction.guild.ownerId) {
      return interaction.reply({ content: `Vous ne pouvez pas ban le fondateur du serveur`, ephemeral: true })
    }

    let embed = new MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`[BAN] ${user.tag}`)
      .addField('Modérateur', interaction.user.username, true)
      .addField('Raison', raison, true)
      .addField('Durée', humanizeDuration(temps, {language: 'fr'}), true)
      .setThumbnail(user.displayAvatarURL());

    await interaction.guild.bans.create(user, {reason: raison}).then(() => {interaction.reply({ embeds: [embed]})})
    setTimeout(() => {
        interaction.guild.members.unban(user)
        return interaction.channel.send(`${user.tag} a été débanni.`)
    }, temps)
  },
}



        