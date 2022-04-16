const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const fs = require('fs')
const db = require('../db.json')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('avertir une personne')
        .addUserOption(option => option.setName('user').setDescription('personne à avertir').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('raison de l\'avertissement').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
    const raison = interaction.options.getString('raison')
        
    if (user == interaction.user.id) {
      return interaction.reply({ content: `Vous ne pouvez pas vous warn vous même`, ephemeral: true })
    }
    if (user == interaction.guild.ownerId) {
      return interaction.reply({ content: `Vous ne pouvez pas warn le fondateur du serveur`, ephemeral: true })
    }

    if (!db.warns[user.id]) db.warns[user.id] = []
        db.warns[user.id].unshift({
            raison,
            date: Date.now(),
            mod: interaction.user.id
        })
    fs.writeFileSync('./db.json', JSON.stringify(db))

    let embed = new MessageEmbed()
      .setTitle(`[WARN] ${user.tag}`)
      .setColor(config.embedColor)
      .addField('Modérateur', interaction.user.username, true)
      .addField('Raison', raison, true)
      .setThumbnail(user.displayAvatarURL());

    return interaction.reply({ embeds: [embed]})

  },
}