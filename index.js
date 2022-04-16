const fs = require('fs');
const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES"], partials: ['CHANNEL'] }); 
client.commands = new Collection();
client.login(config.token);

const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Erreur', ephemeral: true });
	}
});

// const { modMailClient } = require('reconlx')

// const modMail = new modMailClient({
// 	client,
// 	guildId: config.guildId,
// 	category: config.categorieTicket,
// 	modmailRole: config.modo,



const charModMail = require('char-mod-mail');

client.on("ready", () => {
charModMail.ModMail(client, {
  guildID: config.guildId,
  categoryID: config.categorieTicket,
  staffRole: config.modo,
  embedColor: config.embedColor,
  anonymousReply: false,
  closedTitle: "Ticket fermé",
  closedMessage: "Un membre du staff a fermé votre ticket",
  staffOpenedTitle: "Ticket ouvert",
  staffOpenedMessage: "Un membre a ouvert un ticket",
  userOpenedTitle: "Ticket ouvert",
  userOpenedMessage: "Un ticket a été ouvert un membre du staff va vous répondre",
  wrongEmoji: "❌",
  rightEmoji: "✅" 
})
});