const config = require('../config.json')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {

        // const user = await client.users.fetch(newState.member.id);
        // console.log(await newState)
        if(oldState.channel  == null && newState.channel != null) return oldState.guild.channels.cache.get(config.log).send(`${newState.member.user} a rejoint le channel ${newState.channel}`)
        if(newState.voiceChannel == undefined) return oldState.guild.channels.cache.get(config.log).send(`${newState.member.user} a quitté le channel ${oldState.channel}`)
    }
}