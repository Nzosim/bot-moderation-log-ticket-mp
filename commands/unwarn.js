const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const fs = require('fs')
const db = require('../db.json')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('enlever un avertissement à une personne')
        .addUserOption(option => option.setName('user').setDescription('personne à qui retirer un avertissement').setRequired(true))
        .addNumberOption(option => option.setName('numero').setDescription('numéro de l\'avertissement').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
    const numero = interaction.options.getNumber('numero') - 1
        
    if (numero < 0 || !db.warns[user.id][numero]) return interaction.reply('warn inéxistant')

    db.warns[user.id].splice(numero, 1)[0]
    if (!db.warns[user.id].length) delete db.warns[user.id]

    fs.writeFileSync('./db.json', JSON.stringify(db))

    let embed = new MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`[UNWARN] ${user.tag}`)
      .addField('Modérateur', interaction.user.username, true)
      .setThumbnail(user.displayAvatarURL());

    return interaction.reply({ embeds: [embed]})

  },
}




