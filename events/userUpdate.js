const config = require('../config.json')

module.exports = {
    name: 'userUpdate', 
    execute(oldUser, newUser) {
        
        if(oldUser.username !== newUser.username) {
            console.log(newUser.guild);
            newUser.guild.channels.cache.get(config.log).send(`${oldUser.user} a changé de pseudo en ${newUser.username}`);
        }
    },
};