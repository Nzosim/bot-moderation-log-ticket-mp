const config = require('../config.json')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        member.guild.channels.cache.get(config.log).send(`**${member.user}** a quitté, nous sommes maintenant **${member.guild.memberCount}** membres`)

    }
}