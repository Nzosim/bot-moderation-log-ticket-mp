const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('aide sur les commandes'),
  async execute(interaction) {

    const embed = new MessageEmbed()
        .setTitle('Help')
        .setColor(config.embedColor)
        .setDescription('Voici la liste des commandes disponibles :\n\n`/ban [utilisateur] [raison]` : bannir un membre\n`/tempban [utilisateur] [temps] [raison]` : bannir un membre temporairement\n'
            +'`/unban [utilisateur]` : unban un membre\n`/warn [utilisateur] [raison]` : avertir un membre\n`/unwarn [utilisateur] [numeroDuWarn]` : enlever un avertissement à un membre\n'
            +'`/checkwarn [utilisateur]` : voir les avertissement d\'un membre\n`/mute [utilisateur] [temps] [raison]` : mute un membre\n`/unmute [utilisateur] [raison]` : unmute un membre\n'
            +'`/kick [utilisateur] [raison]` : exclure un membre')

    interaction.reply({ embeds: [embed]})
  },
}