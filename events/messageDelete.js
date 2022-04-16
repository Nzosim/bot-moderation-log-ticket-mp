const { MessageEmbed } = require('discord.js'),
    config = require('../config.json')

module.exports = {
    name: 'messageDelete',
    execute(message) {
        if(message.author.bot) return;
   
        const Log = new MessageEmbed()
            .setTitle(`${message.author.tag} a supprimé un message`)
            .setTimestamp()
            .setDescription(message.content)
        if(message.attachments.size >= 1) {
            Log.addField(`Attachments`, `${message.attachments.map(a => a.url)}`, true)
        }
        return message.guild.channels.cache.get(config.log).send({embeds: [Log]})

    }
}