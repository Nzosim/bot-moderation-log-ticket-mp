const config = require('../config.json')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        member.guild.channels.cache.get(config.bienvenueChannel).send(`Bienvenue **${member.user}** sur le serveur **${member.guild.name}**, nous sommes à présent **${member.guild.memberCount}** membres !`)
        member.roles.add(member.guild.roles.cache.get(config.nonVerif))

    }
}