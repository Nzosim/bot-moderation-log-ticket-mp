const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban une personne')
        .addStringOption(option => option.setName('user').setDescription('id de la personne à débannir').setRequired(true)),
  async execute(interaction) {

    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")

    const user = interaction.options.getString('user')
        
    const bans = await interaction.guild.bans.fetch()
    if(bans.has(user)) {
        interaction.guild.members.unban(user)
        return interaction.reply({ content: `${user} a été unban.`})
    }else{
        return interaction.reply({ content: `${user} n'est pas ban.`})
    }

  },
}



        