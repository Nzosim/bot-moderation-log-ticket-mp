const config = require('../config.json')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        member.guild.channels.cache.get(config.log).send(`**${member.user}**a join le serveur, nous sommes maintenant **${member.guild.memberCount}** membres`)

    }
}