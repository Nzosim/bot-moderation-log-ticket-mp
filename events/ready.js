const config = require('../config.json');

module.exports = {
    name: 'ready',
    async execute(client) {

        console.log("Bot ready");
        client.user.setActivity(config.activite, { type: 'PLAYING' });

    }
}