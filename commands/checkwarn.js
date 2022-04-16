const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const db = require('../db.json')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkwarn')
    .setDescription('voir les warns d\'une personne')
        .addUserOption(option => option.setName('user').setDescription('personne').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getUser('user')
    
    if (!db.warns[user.id]) return interaction.reply('Ce membre n\'a aucun warn.')

    const embed1 = new MessageEmbed()
            .setColor(config.embedColor)
            .setDescription(`**Warns de ${user.username}**\n**Total de warns :** ${db.warns[user.id].length}\n\n${db.warns[user.id].slice(0, db.warns[user.id].length).map((warn, i) => `**${i + 1}.** ${warn.raison}\nSanctionné par <@!${warn.mod}>`).join('\n\n')}`)

    return interaction.reply({ embeds: [embed1]})

  },
}