const fs = require("fs");

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.commands = new Collection();
const commandFiles = fs.readdirSync('./SRC/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./SRC/events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./SRC/commands/${file}`);
	bot.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./SRC/events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, bot));
	} else {
		bot.on(event.name, (...args) => event.execute(...args, bot));
	}
}


console.log("Bot is online! And commands are loaded!")

bot.login(process.env.TOKEN);

