const config = require('../config.json')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        member.guild.channels.cache.get(config.bienvenueChannel).send(`Au revoir **${member.user}**, nous sommes à présent **${member.guild.memberCount}** membres !`)

    }
}